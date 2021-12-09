import { gql } from '@apollo/client';
import { TaskAPIResponse } from '../../../types';

export const TasksQuery = gql`
  query tasks(
    $scope: Int
    $startDate: String
    $endDate: String
    $comparePrev: Boolean
  ) {
    tasks(
      scope: $scope
      startDate: $startDate
      endDate: $endDate
      comparePrev: $comparePrev
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

export interface TasksArgs {
  scope?: number;
  startDate?: string;
  endDate?: string;
  comparePrev?: boolean;
}

export interface TasksRes {
  tasks: TaskAPIResponse[];
}
