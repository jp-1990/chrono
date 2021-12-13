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
  };
}

/**
 * @param {number} scope -
 * @returns {object} {@link UseTimelineDataReturn}
 *
 * @description Queries API or cache for tasks, formats them ready for display and returns the result as an object with 'data' and 'summary' properties.
 */
const useTimelineData = (
  month: number,
  year: number
): UseTimelineDataReturn => {
  const [tasks, setTasks] = useState<TasksDataWithMarginAndWidth | undefined>();

  const startDate = moment({ year, month, date: 1 });
  const endDate = moment({
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 0 : month + 1,
    date: 1,
  }).subtract(1, 'days');

  const { loading, error } = useQuery<TasksRes, TasksArgs>(TasksQuery, {
    variables: {
      startDate: startDate
        ? moment(startDate).subtract(1, 'days').toISOString()
        : undefined,
      endDate: endDate
        ? moment(endDate).add(2, 'days').toISOString()
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

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment(startDate).format('x');
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment(endDate).add(1, 'days').format('x');
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // get a summary of the tasks by group
  const summary = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);

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
    },
  };
};

export default useTimelineData;
