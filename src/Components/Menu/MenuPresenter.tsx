import React from 'react';
import { MutationFunctionOptions } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from '../../typed-components';
import { ToggleDriving, UserProfile } from '../../types/api';

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDrivingBox = styled<IToggleProps & any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: UserProfile;
  getUserProfileLoading: boolean;
  toggleDriving: (
    options?: MutationFunctionOptions<ToggleDriving> | undefined
  ) => Promise<any>;
  toggleDrivingLoading: boolean;
}

const MenuPresenter: React.SFC<IProps> = ({
  // default 값을 설정해준다.
  data: { GetMyProfile: { user = null } = {} } = {},
  getUserProfileLoading,
  toggleDriving,
  toggleDrivingLoading
}) => (
  <Container>
    {!getUserProfileLoading && user && (
      <>
        <Header>
          <Grid>
            <Link to={"/edit-account"}>
              <Image
                src={
                  user.profilePhoto! && user.profilePhoto!.length > 0
                    ? user.profilePhoto!
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTLZOZaZ5c3BOwJF54re4oxVrTLCXBXjRWC_f6y0S-o-QQtt5Y"
                }
              />
            </Link>
            <Text>
              <Name>{user.fullName!}</Name>
              <Rating>4.5</Rating>
            </Text>
          </Grid>
        </Header>
        <SLink to="/trips">Your Trips</SLink>
        <SLink to="/settings">Settings</SLink>
        <ToggleDrivingBox onClick={toggleDriving} isDriving={user.isDriving!}>
          {user.isDriving! ? "Stop driving" : "Start driving"}
        </ToggleDrivingBox>
      </>
    )}
  </Container>
);

export default MenuPresenter;
