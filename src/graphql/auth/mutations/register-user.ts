import { gql } from '@apollo/client';

export const RegisterUserMutation = gql`
  mutation registerUser(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    registerUser(
      name: $name
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
    )
  }
`;

export interface RegisterUserMutationArgs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterUserMutationRes {
  registerUser: boolean;
}
