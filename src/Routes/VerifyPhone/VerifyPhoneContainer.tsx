import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { LOG_USER_IN } from '../../sharedQueries.local';
import { VerifyPhone, VerifyPhoneVariables } from '../../types/api';

interface Props extends RouteComponentProps<any> {}

const VerifyPhoneContainer: React.FC<Props> = ({ location, history }) => {
  if (!location.state) {
    history.push("/");
  }
  const [completePhoneVerification, { loading: SubmitLoading }] = useMutation<
    VerifyPhone,
    VerifyPhoneVariables
  >(VERIFY_PHONE, {
    onCompleted({ CompletePhoneVerification }) {
      if (!CompletePhoneVerification) {
        return;
      }
      if (CompletePhoneVerification.ok) {
        toast.success("You're verified, login now~!");
        if (CompletePhoneVerification.token) {
          logInUser({
            variables: {
              token: CompletePhoneVerification.token
            }
          });
        }
      } else {
        toast.error(CompletePhoneVerification.error);
      }
    }
    // option 1
    // update(cache, { data }) {
    //   cache.writeData({
    //     data: {
    //       __typename: "Auth",
    //       isLoggedIn: true
    //     }
    //   });
    // }
  });

  // option 2
  const [logInUser, { loading: loginLoading }] = useMutation(LOG_USER_IN);
  console.log(loginLoading, "loginLoading");

  const phoneNumberObj = location.state as any;
  const [verifyKey, setVerifyKey] = useState("");
  const [phoneNumber] = useState(phoneNumberObj.phone);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    setVerifyKey(value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    completePhoneVerification({
      variables: { key: verifyKey, phoneNumber }
    });
  };

  return (
    <VerifyPhonePresenter
      onChange={onInputChange}
      onSubmit={onSubmit}
      verifyKey={verifyKey}
      SubmitLoading={SubmitLoading}
    />
  );
};

export default VerifyPhoneContainer;
