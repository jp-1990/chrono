import { gql } from "@apollo/client";

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
  findTasks: {
    id: string;
    title: string;
    group: string;
    description: string;
    colour: string;
    start: number;
    end: number;
    createdAt: number;
    percentageTimes: {
      startPercentage: number;
      endPercentage: number;
    };
    luminance: number;
    user: {
      id: string;
      name: string;
    };
  }[];
}
