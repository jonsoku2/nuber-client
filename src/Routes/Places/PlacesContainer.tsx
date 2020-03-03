import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import PlacesPresenter from './PlacesPresenter';
import { GET_PLACES } from '../../sharedQueries';
import { GetPlaces } from '../../types/api';

interface Props {}

const PlacesContainer: React.FC<Props> = () => {
  const { data, loading } = useQuery<GetPlaces>(GET_PLACES);
  return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
