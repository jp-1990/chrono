import { gql } from "@apollo/client";
import { TaskAPIResponse } from "../../../types";

export const CreateTaskMutation = gql`
  mutation createTask(
    $title: String!
    $activity: String
    $notes: String
    $start: String!
    $end: String!
    $colour: String
  ) {
    createTask(
      title: $title
      group: $activity
      description: $notes
      start: $start
      end: $end
      colour: $colour
    ) {
      id
      title
      group
      description
      colour
      start
      end
      createdAt
      percentageTimes {
        startPercentage
        endPercentage
      }
      luminance
      user {
        id
        name
      }
    }
  }
`;

export interface CreateTaskMutationArgs {
  title: string;
  activity: string;
  notes?: string;
  start: Date;
  end: Date;
  colour: string;
}

export interface CreateTaskMutationRes {
  createTask: TaskAPIResponse;
}
