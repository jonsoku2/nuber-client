import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import PlacePresenter from './PlacePresenter';
import { EDIT_PLACE } from './PlaceQueries';
import { GET_PLACES } from '../../sharedQueries';
import { EditPlace, EditPlaceVariables } from '../../types/api';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

const PlaceContainer: React.FC<IProps> = ({ fav, name, address, id }) => {
  const [editPlaceFn] = useMutation<EditPlace, EditPlaceVariables>(EDIT_PLACE, {
    variables: {
      placeId: id,
      isFav: !fav
    },
    refetchQueries: [{ query: GET_PLACES }]
  });
  return (
    <PlacePresenter
      onStarPress={editPlaceFn}
      fav={fav}
      name={name}
      address={address}
    />
  );
};

export default PlaceContainer;
