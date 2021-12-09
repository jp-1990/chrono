import { ApolloError, useQuery } from '@apollo/client';
import moment from 'moment';
import { useState } from 'react';
import { TasksQuery, TasksRes, TasksArgs } from '../../../../graphql/queries';
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

interface UseTimelineDataReturn {
  data: {
    tasks: TasksDataWithMarginAndWidth | undefined;
    loading: boolean;
    error: ApolloError | undefined;
    startDate: number;
    endDate: number;
  };
  summary: {
    summary: GroupSummaryWithName[] | undefined;
    totalRecorded: {
      hours: number;
      minutes: number;
    };
    totalPossible: number;
  };
}

/**
 * @param {number} scope -
 * @returns {object} {@link UseTimelineDataReturn}
 *
 * @description Queries API or cache for tasks, formats them ready for display and returns the result as an object with 'data' and 'summary' properties.
 */
const useTimelineData = (
  scope?: number,
  startDate?: Date | undefined,
  endDate?: Date | undefined
): UseTimelineDataReturn => {
  const [tasks, setTasks] = useState<TasksDataWithMarginAndWidth | undefined>();

  const { loading, error } = useQuery<TasksRes, TasksArgs>(TasksQuery, {
    variables: {
      scope: scope ? scope + 1 : undefined,
      startDate: startDate
        ? moment(startDate).subtract(1, 'days').toISOString()
        : undefined,
      endDate: endDate
        ? moment(endDate).add(1, 'days').toISOString()
        : undefined,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      // build the data structure to display in app
      const tasksData = buildTasksDataStructure(res);
      setTasks(tasksData);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const range = moment
    .duration(moment(endDate).diff(moment(startDate)))
    .asDays();

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment(endDate)
    .subtract(range || scope, 'days')
    .format('x');
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment(endDate).add(1, 'days').format('x');
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // get a summary of the tasks by group
  const summary = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);

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
      summary,
      totalRecorded,
      totalPossible,
    },
  };
};

export default useTimelineData;
