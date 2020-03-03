import { useMutation, useQuery } from '@apollo/react-hooks';
import { SubscribeToMoreOptions } from 'apollo-boost';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RidePresenter from './RidePresenter';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './RideQueries';
import { USER_PROFILE } from '../../sharedQueries';
import {
  GetRide,
  GetRideVariables,
  UpdateRide,
  UpdateRideVariables,
  UserProfile
  } from '../../types/api';

interface IProps extends RouteComponentProps<any> {}

const RideContainer: React.FC<IProps> = ({ match }) => {
  const { data: userData } = useQuery<UserProfile>(USER_PROFILE);
  const { data: getRideData, loading, subscribeToMore } = useQuery<
    GetRide,
    GetRideVariables
  >(GET_RIDE, {
    variables: {
      rideId: Number(match.params.rideId)
    },
    onCompleted({ GetRide }) {
      if (!GetRide) {
        return;
      }
      if (GetRide.ok) {
        console.log(GetRide.ride);
        const subscribeOptions: SubscribeToMoreOptions = {
          document: RIDE_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const {
              data: {
                RideStatusSubscription: { status }
              }
            } = subscriptionData;
            if (status === "FINISHED") {
              window.location.href = "/";
            }
          }
        };
        subscribeToMore(subscribeOptions);
      }
    }
  });

  const [updateRideFn] = useMutation<UpdateRide, UpdateRideVariables>(
    UPDATE_RIDE_STATUS,
    {
      refetchQueries: [
        {
          query: GET_RIDE,
          variables: {
            rideId: Number(match.params.rideId)
          }
        }
      ]
    }
  );

  console.log(getRideData, "getRideData");
  return (
    <RidePresenter
      userData={userData}
      getRideData={getRideData}
      loading={loading}
      updateRideFn={updateRideFn}
    />
  );
};

export default RideContainer;
