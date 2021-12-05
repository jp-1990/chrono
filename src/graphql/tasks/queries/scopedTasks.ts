import { gql } from '@apollo/client';
import { TaskAPIResponse } from '../../../types';

export const ScopedTasksQuery = gql`
  query scopedTasks($scope: Int) {
    scopedTasks(scope: $scope) {
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

export interface ScopedTasksArgs {
  scope: number;
}

export interface ScopedTasksRes {
  scopedTasks: TaskAPIResponse[];
}
