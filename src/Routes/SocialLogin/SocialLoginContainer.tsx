import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialLoginPresenter from './SocialLoginPresenter';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import { LOG_USER_IN } from '../../sharedQueries.local';
import { FacebookConnect, FacebookConnectVariables } from '../../types/api';

interface FormState {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  accessToken: string;
}

interface IProps extends RouteComponentProps<any, any> {}

const SocialLoginContainer: React.SFC<IProps> = () => {
  const [facebookConnect, { loading: facebookConnectLoading }] = useMutation<
    FacebookConnect,
    FacebookConnectVariables
  >(FACEBOOK_CONNECT, {
    onCompleted({ FacebookConnect }) {
      if (!FacebookConnect) {
        return;
      }
      if (FacebookConnect.ok) {
        toast.success("You're verified, login now~!");
        if (FacebookConnect.token) {
          logInUser({
            variables: {
              token: FacebookConnect.token
            }
          });
        }
      } else {
        toast.error(FacebookConnect.error);
      }
    }
  });

  const [logInUser, { loading: loginLoading }] = useMutation(LOG_USER_IN);

  const loginCallback = (response: FormState) => {
    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      facebookConnect({
        variables: {
          firstName: first_name,
          lastName: last_name,
          email,
          fbId: id
        }
      });
    } else {
      toast.error("Could not log you in 🙀");
    }
  };

  return (
    <SocialLoginPresenter
      loginCallback={loginCallback}
      facebookConnectLoading={facebookConnectLoading}
      loginLoading={loginLoading}
    />
  );
};

export default SocialLoginContainer;
