import { gql } from "@apollo/client";
import { TaskAPIResponse } from "../../../types";

export const UpdateTaskMutation = gql`
  mutation updateTask(
    $id: String!
    $title: String
    $notes: String
    $start: String
    $end: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $notes
      start: $start
      end: $end
    ) {
      id
      title
      description
      start
      end
      percentageTimes {
        startPercentage
        endPercentage
      }
    }
  }
`;
export interface UpdateTaskMutationArgs {
  id: string;
  title?: string;
  notes?: string;
  start?: string;
  end?: string;
}
export interface UpdateTaskMutationRes {
  updateTask: Omit<
    TaskAPIResponse,
    "user" | "luminance" | "createdAt" | "colour" | "group"
  >;
}

export const UpdateTasksColourAndGroupMutation = gql`
  mutation updateTaskColourAndGroup(
    $title: String!
    $colour: String
    $activity: String
  ) {
    updateTaskColourAndGroup(title: $title, group: $activity, colour: $colour) {
      id
      group
      colour
      luminance
    }
  }
`;
export interface UpdateTasksColourAndGroupArgs {
  title: string;
  activity?: string;
  colour?: string;
}
export interface UpdateTasksColourAndGroupRes {
  updateTaskColourAndGroup: Omit<
    TaskAPIResponse,
    | "user"
    | "percentageTimes"
    | "createdAt"
    | "start"
    | "end"
    | "description"
    | "title"
  >[];
}
