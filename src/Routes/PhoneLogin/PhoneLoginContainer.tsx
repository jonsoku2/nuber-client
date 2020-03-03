import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { PHONE_SIGN_IN } from './PhoneQueries';
import { StartPhoneVerification, StartPhoneVerificationVariables } from '../../types/api';

const PhoneLoginContainer: React.SFC<RouteComponentProps<any>> = ({
  history
}) => {
  const [startPhoneVerification, { loading }] = useMutation<
    StartPhoneVerification,
    StartPhoneVerificationVariables
  >(PHONE_SIGN_IN, {
    onCompleted({ StartPhoneVerification }) {
      const phone = `${countryCode}${phoneNumber}`;
      if (!StartPhoneVerification) {
        return;
      }
      if (StartPhoneVerification.ok) {
        toast.success("SMS Sent~ ! Redirecting You...", { autoClose: 500 });
        setTimeout(() => {
          history.push({
            pathname: "/verify-phone",
            state: {
              phone
            }
          });
        }, 2000);
        return;
      } else {
        toast.error(StartPhoneVerification.error);
      }
    }
  });

  const [formData, setFormData] = useState({
    countryCode: "+81",
    phoneNumber: ""
  });
  const { countryCode, phoneNumber } = formData;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    // eslint-disable-next-line
    const isValid = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(
      `${countryCode}${phoneNumber}`
    );
    if (isValid) {
      startPhoneVerification({
        variables: { phoneNumber: `${countryCode}${phoneNumber}` }
      });
    } else {
      toast.error("올바르지 않은 번호입니다.");
    }
  };

  const onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    setFormData({
      ...formData,
      [name]: value
    } as any); // 버그...
  };

  return (
    <PhoneLoginPresenter
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default PhoneLoginContainer;
