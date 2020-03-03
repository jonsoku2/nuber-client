import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { toast } from 'react-toastify';
import MenuPresenter from './MenuPresenter';
import { TOGGLE_DRIVING } from './MenuQueries';
import { USER_PROFILE } from '../../sharedQueries';
import { ToggleDriving, UserProfile } from '../../types/api';

interface IProps {}

const MenuContainer: React.FC<IProps> = () => {
  const { data, loading: getUserProfileLoading } = useQuery<UserProfile>(
    USER_PROFILE,
    {
      fetchPolicy: "cache-and-network"
    }
  );
  const [toggleDriving, { loading: toggleDrivingLoading }] = useMutation<
    ToggleDriving
  >(TOGGLE_DRIVING, {
    onCompleted({ ToggleDrivingMode }) {
      if (!ToggleDrivingMode) {
        return;
      }
      if (ToggleDrivingMode.ok) {
        toast.success("Updated your driving status!");
      } else {
        toast.error("fail");
      }
    },
    // refetchQueries: () => [{ query: USER_PROFILE }]
    // refetch 대용
    update(cache, { data }) {
      if (data) {
        const { ToggleDrivingMode } = data;
        if (!ToggleDrivingMode.ok) {
          toast.error(ToggleDrivingMode.error);
          // 함수를 종료 (kill function)
          return;
        }
        // cache를 사용할 수 있다. (client에서만 이루어짐)
        // 그럼 언제 ?
        const query: UserProfile | null = cache.readQuery({
          query: USER_PROFILE
        });
        if (query) {
          const {
            GetMyProfile: { user }
          } = query;
          if (user) {
            user.isDriving = !user.isDriving;
          }
        }
        cache.writeQuery({
          query: USER_PROFILE,
          data: query
        });
      }
    }
  });

  return (
    <MenuPresenter
      data={data}
      toggleDriving={toggleDriving}
      getUserProfileLoading={getUserProfileLoading}
      toggleDrivingLoading={toggleDrivingLoading}
    />
  );
};

export default MenuContainer;
