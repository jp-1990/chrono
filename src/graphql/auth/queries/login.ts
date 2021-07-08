import { gql } from "@apollo/client";

export const LoginQuery = gql`
  query signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
      }
      token
      tokenExpires
    }
  }
`;

export interface LoginQueryArgs {
  email: string;
  password: string;
}

export interface LoginQueryRes {
  signIn: {
    user: {
      id: string;
    };
    token: string;
    tokenExpires: number;
  };
}
