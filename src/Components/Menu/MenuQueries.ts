import { gql } from 'apollo-boost';

export const TOGGLE_DRIVING = gql`
  mutation ToggleDriving {
    ToggleDrivingMode {
      ok
      error
    }
  }
`;
