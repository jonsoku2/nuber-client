import React from 'react';
import { MutationFunctionOptions } from 'react-apollo';
import Helmet from 'react-helmet';
import PhotoInput from 'src/Components/PhotoInput';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../typed-components';
import { UpdateProfile, UpdateProfileVariables } from '../../types/api';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onSubmit: (
    options?:
      | MutationFunctionOptions<UpdateProfile, UpdateProfileVariables>
      | undefined
  ) => Promise<any>;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateProfileLoading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  onInputChange,
  updateProfileLoading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm onSubmit={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        name={"firstName"}
        type={"text"}
        value={firstName}
        placeholder={"First name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        name={"lastName"}
        type={"text"}
        value={lastName}
        placeholder={"Last name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        name={"email"}
        type={"email"}
        value={email}
        placeholder={"Email"}
      />
      <Button
        onClick={null}
        value={updateProfileLoading ? "Loading" : "Update"}
      />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
