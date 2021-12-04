import { gql } from '@apollo/client';

export const DeleteTaskMutation = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export interface DeleteTaskMutationArgs {
  id: string;
}

export interface DeleteTaskMutationRes {
  deleteTask: {
    id: string;
  };
}
