import { gql } from "@apollo/client";
import { TaskAPIResponse } from "../../../types";

export const FindTasksQuery = gql`
  query findTasks($scope: Int) {
    findTasks(scope: $scope) {
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

export interface FindTasksArgs {
  scope: number;
}

export interface FindTasksRes {
  findTasks: TaskAPIResponse[];
}
