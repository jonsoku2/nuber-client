import { useMutation, useQuery } from '@apollo/react-hooks';
import { SubscribeToMoreOptions } from 'apollo-boost';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomePresenter from './HomePresenter';
import {
  GET_NEARBY_DRIVERS,
  GET_NEARBY_RIDE,
  REPORT_LOCATION,
  REQUEST_RIDE
  } from './HomeQueries';
import { ACCEPT_RIDE, SUBSCRIBE_NEARBY_RIDES } from './HomeQueries';
import { ReportMovementResponse } from '../../../../nuber-server/src/types/graph';
import { geoCode, reverseGeoCode } from '../../mapHelpers';
import { USER_PROFILE } from '../../sharedQueries';
import { AcceptRide_UpdateRideStatus } from '../../types/api';
import {
  AcceptRide,
  AcceptRideVariables,
  GetRides,
  RequestRide_RequestRide
  } from '../../types/api';
import {
  GetDrivers,
  ReportMovementVariables,
  RequestRide,
  RequestRideVariables,
  UserProfile
  } from '../../types/api';

interface IState {
  isMenuOpen: boolean;
}

interface CState {
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
  distance: string;
  duration?: string;
  price?: number;
  fromAddress: string;
  foundRide: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

let map: google.maps.Map;
let userMarker: google.maps.Marker;
let toMarker: google.maps.Marker;
let directions: google.maps.DirectionsRenderer;
let driverMarkers: google.maps.Marker[] = [];

const HomeContainer: React.SFC<IProps & IState> = ({ google, history }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<IState["isMenuOpen"]>(false);
  const [coordinates, setCoordinates] = useState<CState>({
    lat: 0,
    lng: 0,
    toAddress: "",
    toLat: 0,
    toLng: 0,
    distance: "",
    duration: "",
    price: undefined,
    fromAddress: "",
    foundRide: false
  });
  const [isDriver, setIsDriver] = useState(false);

  const {
    lat,
    lng,
    toAddress,
    toLat,
    toLng,
    distance,
    duration,
    price,
    fromAddress
  } = coordinates;

  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  const handleGeoSuccess = async (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    const address = await getFromAddress(latitude, longitude);
    setCoordinates({
      ...coordinates,
      fromAddress: address,
      lat: latitude,
      lng: longitude
    });
    loadMap(latitude, longitude);
  };

  const getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    return address;
  };

  const { data: userData, loading: getUserProfileLoading } = useQuery<
    UserProfile
  >(USER_PROFILE, {
    onCompleted({ GetMyProfile }) {
      if (!GetMyProfile) {
        return;
      }
      if (GetMyProfile.user) {
        setIsDriver(GetMyProfile.user.isDriving);
      }
    }
  });

  useQuery<GetDrivers>(GET_NEARBY_DRIVERS, {
    skip: isDriver,
    pollInterval: 5000,
    fetchPolicy: "cache-and-network",
    onCompleted({ GetNearbyDrivers }) {
      const { maps } = google;
      const { ok, drivers } = GetNearbyDrivers;
      if (ok && drivers && drivers.length > 0) {
        console.log(drivers);
        for (const driver of drivers) {
          if (driver && driver.lastLat && driver.lastLng) {
            const existingDriver:
              | google.maps.Marker
              | undefined = driverMarkers.find(
              (driverMarker: google.maps.Marker) => {
                const markerId = driverMarker.get("ID");
                return markerId === driver.id;
              }
            );
            if (existingDriver) {
              existingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng
              });
              existingDriver.setMap(map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                icon: {
                  path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 7
                },
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                }
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );
              driverMarkers.push(newMarker);
              newMarker.set("ID", driver.id);
              newMarker.setMap(map);
            }
          }
        }
      }
    }
  });

  const [reportLocation] = useMutation<
    ReportMovementResponse,
    ReportMovementVariables
  >(REPORT_LOCATION);

  const [requestRideFn] = useMutation<RequestRide, RequestRideVariables>(
    REQUEST_RIDE,
    {
      variables: {
        pickUpAddress: fromAddress,
        pickUpLat: lat,
        pickUpLng: lng,
        dropOffAddress: toAddress,
        dropOffLat: toLat,
        dropOffLng: toLng,
        price: price || 0,
        distance: distance,
        duration: duration || ""
      },
      onCompleted({ RequestRide }) {
        handleRideRequest(RequestRide);
      }
    }
  );

  const { subscribeToMore, data: nearbyRide } = useQuery<GetRides>(
    GET_NEARBY_RIDE,
    {
      skip: !isDriver,
      pollInterval: 5000,
      fetchPolicy: "cache-and-network",
      onCompleted({ GetNearbyRide }) {
        if (!GetNearbyRide) {
          return;
        }
        if (!GetNearbyRide.error) {
          const rideSubscriptionOptions: SubscribeToMoreOptions = {
            document: SUBSCRIBE_NEARBY_RIDES,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev;
              }
              console.log(subscriptionData.data);
              const newObj = Object.assign({}, prev, {
                GetNearbyRide: {
                  ...prev.GetNearbyRide,
                  ride: subscriptionData.data.NearbyRideSubscription
                }
              });
              return newObj;
            }
          };
          if (!isDriver) {
            subscribeToMore(rideSubscriptionOptions);
          }
        }
      }
    }
  );

  const [acceptRideFn] = useMutation<AcceptRide, AcceptRideVariables>(
    ACCEPT_RIDE,
    {
      onCompleted({ UpdateRideStatus }) {
        if (!UpdateRideStatus) {
          return;
        }
        if (!UpdateRideStatus.error) {
          handleRideAcceptance(UpdateRideStatus);
        }
      }
    }
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loadMap = (lat, lng) => {
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    if (!mapNode) {
      loadMap(lat, lng);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 13
    };

    map = new maps.Map(mapNode, mapConfig);

    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };

    userMarker = new maps.Marker(userMarkerOptions);
    userMarker.setMap(map);

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };

    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  };

  const handleGeoWatchSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    userMarker.setPosition({ lat: latitude, lng: longitude });
    map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lat: latitude,
        lng: longitude
      }
    });
  };

  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };

  const handleGeoError = () => {
    console.log("No location");
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    setCoordinates({
      ...coordinates,
      [name]: value
    } as any);
  };

  const onAddressSubmit = async () => {
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      if (toMarker) {
        toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      toMarker = new maps.Marker(toMarkerOptions);
      toMarker.setMap(map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: lat, lng: lng });
      map.fitBounds(bounds);
      setCoordinates({
        ...coordinates,
        toAddress: formattedAddress,
        toLat: lat,
        toLng: lng
      });
    }
  };

  const createPath = () => {
    const { toLat, toLng, lat, lng } = coordinates;
    if (directions) {
      directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(directionsOptions, handleDirectionsService);
  };

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      createPath();
    }
  }, [toLat, toLng]);

  const handleDirectionsService = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      directions.setDirections(result);
      directions.setMap(map);
      setCoordinates({
        ...coordinates,
        distance: distance,
        duration: duration
      });
    } else {
      toast.error("There is no route there, you have to");
    }
  };

  const setPrice = () => {
    const defaultPrice = 500;
    const { distance } = coordinates;
    const transDistance = Number(distance.replace(" km", ""));
    const applyDistance = transDistance - 1;
    const applyPrice = applyDistance * 200;
    const totalPrice = defaultPrice + applyPrice;
    setCoordinates({
      ...coordinates,
      price: totalPrice || undefined
    });
  };

  useEffect(() => {
    if (distance.length > 0) {
      setPrice();
    }
  }, [distance]);

  const handleRideRequest = (RequestRide: RequestRide_RequestRide) => {
    if (!RequestRide) {
      return;
    }
    if (RequestRide.ok) {
      toast.success("Drive requested, finding a driver!");
      history.push({
        pathname: `/ride/${RequestRide.ride?.id}`
      });
    } else {
      toast.error(RequestRide.error);
    }
  };

  const handleRideAcceptance = (
    UpdateRideStatus: AcceptRide_UpdateRideStatus
  ) => {
    if (UpdateRideStatus.ok) {
      history.push({
        pathname: `/ride/${UpdateRideStatus.rideId}`
      });
    }
  };

  return (
    <HomePresenter
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      userData={userData}
      price={price}
      getUserProfileLoading={getUserProfileLoading}
      mapRef={mapRef}
      toAddress={toAddress}
      onInputChange={onInputChange}
      onAddressSubmit={onAddressSubmit}
      requestRideFn={requestRideFn}
      nearbyRide={nearbyRide}
      acceptRideFn={acceptRideFn}
    />
  );
};

export default HomeContainer;
