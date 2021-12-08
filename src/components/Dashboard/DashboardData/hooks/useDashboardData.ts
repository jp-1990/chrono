import { ApolloError, useQuery } from '@apollo/client';
import moment from 'moment';
import { useState } from 'react';
import {
  ScopedTasksQuery,
  ScopedTasksRes,
  ScopedTasksArgs,
} from '../../../../graphql/queries';
import {
  GroupSummaryWithName,
  TasksDataWithMarginAndWidth,
} from '../../../../types';
import {
  buildTasksDataStructure,
  convertDateToMidnightUnixString,
  durationInHours,
  hoursToHoursAndMinutes,
  tasksSummary,
} from '../../../../utils';

interface UseDashboardDataReturn {
  data: {
    tasks: TasksDataWithMarginAndWidth | undefined;
    loading: boolean;
    error: ApolloError | undefined;
    startDate: number;
    endDate: number;
  };
  summary: {
    topActivities: GroupSummaryWithName[] | undefined;
    totalRecorded: {
      hours: number;
      minutes: number;
    };
    totalPossible: number;
  };
}

/**
 * @description Queries API or cache for tasks, formats them ready for display and returns the result as an object with 'data' and 'summary' properties.
 *
 * @returns {object} {@link UseDashboardDataReturn}
 */
const useDashboardData = (): UseDashboardDataReturn => {
  const [tasks, setTasks] = useState<TasksDataWithMarginAndWidth | undefined>();
  const { loading, error } = useQuery<ScopedTasksRes, ScopedTasksArgs>(
    ScopedTasksQuery,
    {
      variables: {
        scope: 10,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      onCompleted: (res) => {
        // build the data structure to display in app
        const tasksData = buildTasksDataStructure(res);
        setTasks(tasksData);
      },

      onError: (err) => {
        console.error(err);
      },
    }
  );

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment().subtract(6, 'days').format('x');
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment().add(1, 'days').format('x');
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // get a summary of the tasks by group
  const summary = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);
  // get top 3 activities
  const topActivities = summary?.slice(0, 3);

  // calc total time of summarised tasks
  const totalTime =
    summary &&
    [...summary].reduce((total, current) => {
      return total + current.totalTime;
    }, 0);

  // get total as hours and mins
  const totalRecorded = hoursToHoursAndMinutes(totalTime);
  const totalPossible = durationInHours(
    moment(startDateToDisplay),
    moment(endDateToDisplay)
  );

  return {
    data: {
      tasks,
      loading,
      error,
      startDate: startDateToDisplay,
      endDate: endDateToDisplay,
    },
    summary: {
      topActivities,
      totalRecorded,
      totalPossible,
    },
  };
};

export default useDashboardData;
