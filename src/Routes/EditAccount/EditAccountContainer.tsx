import { useMutation, useQuery } from '@apollo/react-hooks';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EditAccountPresenter from './EditAccountPresenter';
import { UPDATE_PROFILE } from './EditAccountQueries';
import { USER_PROFILE } from '../../sharedQueries';
import {
    UpdateProfile,
    UpdateProfileVariables,
    UserProfile,
    UserProfile_GetMyProfile
    } from '../../types/api';

interface IProps {}

const EditAccountContainer: React.SFC<IProps> = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
    uploading: false
  });
  const { email, firstName, lastName, profilePhoto, uploading } = formData;
  useQuery<UserProfile>(USER_PROFILE, {
    onCompleted({ GetMyProfile }) {
      updateFields(GetMyProfile);
    },
    fetchPolicy: "cache-and-network"
  });
  const [updateProfileFn, { loading: updateProfileLoading }] = useMutation<
    UpdateProfile,
    UpdateProfileVariables
  >(UPDATE_PROFILE, {
    variables: {
      firstName,
      lastName,
      profilePhoto,
      email
    },
    onCompleted({ UpdateMyProfile }) {
      if (!UpdateMyProfile) {
        return;
      }
      if (UpdateMyProfile.ok) {
        toast.success("Profile Updated!");
      } else {
        toast.error(UpdateMyProfile.error);
      }
    },
    refetchQueries: [{ query: USER_PROFILE }]
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const {
      target: { name, value, files }
    } = event;
    if (files) {
      // 요놈은 file에서만 실행되고, 즉각적으로 실행되는 놈입니당
      setFormData({
        ...formData,
        uploading: true
      });
      const fileFormData = new FormData();
      fileFormData.append("file", files[0]);
      fileFormData.append("api_key", "416739696518245");
      fileFormData.append("upload_preset", "mkcpj4cq");
      fileFormData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dzgjjwugw/image/upload",
        fileFormData
      );
      if (secure_url) {
        toast.success("success upload image");
        setFormData({
          ...formData,
          uploading: false,
          profilePhoto: secure_url
        });
      }
    } else {
      // 이부분때문에 자꾸 url이 초기화되었었음 ! 그래서 else문으로 ~!
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const updateFields = (GetMyProfile: UserProfile_GetMyProfile) => {
    if (GetMyProfile.user !== null) {
      const { firstName, lastName, email, profilePhoto } = GetMyProfile.user;
      setFormData({
        ...formData,
        email: email,
        firstName: firstName,
        lastName: lastName,
        profilePhoto: profilePhoto
      } as any);
    } else {
      toast.error("user data error");
      return;
    }
  };
  return (
    <EditAccountPresenter
      email={email}
      firstName={firstName}
      lastName={lastName}
      profilePhoto={profilePhoto}
      onInputChange={onInputChange}
      updateProfileLoading={updateProfileLoading}
      onSubmit={updateProfileFn}
      uploading={uploading}
    />
  );
};

export default EditAccountContainer;
