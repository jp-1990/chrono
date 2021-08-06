import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
      }
      token
      tokenExpires
    }
  }
`;

export interface LoginMutationArgs {
  email: string;
  password: string;
}

export interface LoginMutationRes {
  signIn: {
    user: {
      id: string;
    };
    token: string;
    tokenExpires: string;
  };
}
