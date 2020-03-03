import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddPlacePresenter from './AddPlacePresenter';
import { ADD_PLACE } from './AddPlaceQueries';
import { GET_PLACES } from '../../sharedQueries';
import { AddPlace, AddPlaceVariables } from '../../types/api';

interface IState {
  address: string;
  name: string;
  isFav: boolean;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {}

const AddPlaceContainer: React.FC<IProps> = ({ history, location }) => {
  const placeStateObj = (location.state as any) || {};
  const [formData, setFormData] = useState<IState>({
    address: placeStateObj.address || "",
    name: "",
    isFav: false,
    lat: placeStateObj.lat || 0,
    lng: placeStateObj.lng || 0
  });
  const { address, name, isFav, lat, lng } = formData;

  const [addPlaceFn, { loading: addPlaceLoading }] = useMutation<
    AddPlace,
    AddPlaceVariables
  >(ADD_PLACE, {
    variables: {
      address,
      name,
      isFav,
      lat,
      lng
    },
    refetchQueries: [{ query: GET_PLACES }],
    onCompleted({ AddPlace }) {
      if (AddPlace.ok) {
        toast.success("Place added!");
        setTimeout(() => {
          history.push("/places");
        }, 2000);
      } else {
        toast.error(AddPlace.error);
      }
    }
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    setFormData({
      ...formData,
      [name]: value
    } as any);
  };

  return (
    <AddPlacePresenter
      onInputChange={onInputChange}
      address={address}
      name={name}
      onSubmit={addPlaceFn}
      addPlaceLoading={addPlaceLoading}
      pickedAdress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;
