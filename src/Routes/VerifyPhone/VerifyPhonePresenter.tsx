import React from 'react';
import Helmet from 'react-helmet';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../typed-components';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface Props {
  verifyKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  SubmitLoading: boolean;
}

const VerifyPhonePresenter: React.SFC<Props> = ({
  onChange,
  onSubmit,
  verifyKey,
  SubmitLoading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm onSubmit={onSubmit}>
      <ExtendedInput
        value={verifyKey}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"key"}
      />
      <Button
        value={SubmitLoading ? "Verify" : "Submit"}
        onClick={null}
        disabled={SubmitLoading}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
