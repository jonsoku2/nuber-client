import { gql } from 'apollo-boost';

export const USER_PROFILE = gql`
  query UserProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        email
        fullName
        isDriving
      }
    }
  }
`;

export const GET_PLACES = gql`
  query GetPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;
