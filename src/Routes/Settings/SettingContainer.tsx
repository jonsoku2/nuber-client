import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import SettingPresenter from './SettingPresenter';
import { GET_PLACES, USER_PROFILE } from '../../sharedQueries';
import { LOG_USER_OUT } from '../../sharedQueries.local';
import { GetPlaces, UserProfile } from '../../types/api';

interface Props extends RouteComponentProps<any> {}

const SettingContainer: React.FC<Props> = ({ history }) => {
  const { data: userData, loading: userDataLoading } = useQuery<UserProfile>(
    USER_PROFILE
  );
  const { data: placesData, loading: placesDataLoading } = useQuery<GetPlaces>(
    GET_PLACES
  );

  const [logOutUser] = useMutation(LOG_USER_OUT, {
    update: cache => {
      const existingUser: UserProfile | null = cache.readQuery({
        query: USER_PROFILE
      });
      existingUser!.GetMyProfile.user = null;
      toast.info("Logout success!");
      history.push("/");
    }
  });

  return (
    <SettingPresenter
      userData={userData}
      userDataLoading={userDataLoading}
      placesData={placesData}
      placesDataLoading={placesDataLoading}
      logUserOut={logOutUser}
    />
  );
};

export default SettingContainer;
