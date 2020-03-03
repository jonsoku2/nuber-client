import { GoogleApiWrapper } from 'google-maps-react';
import HomeContainer from './HomeContainer';
import { MAPS_KEY } from '../../keys';

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API || MAPS_KEY
})(HomeContainer);
