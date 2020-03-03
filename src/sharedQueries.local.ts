import { gql } from 'apollo-boost';

export const LOG_USER_IN = gql`
  mutation LogUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const LOG_USER_OUT = gql`
  mutation LogUserOut {
    logUserOut @client
  }
`;
