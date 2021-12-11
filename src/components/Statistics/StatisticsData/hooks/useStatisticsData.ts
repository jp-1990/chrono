import { useState } from 'react';
import moment from 'moment';
import { TasksDataWithMarginAndWidth } from '../../../../types';
import { useQuery } from '@apollo/client';
import { TasksArgs, TasksQuery, TasksRes } from '../../../../graphql/queries';
import {
  buildTasksDataStructure,
  convertDateToMidnightUnixString,
  durationInHours,
  hoursToHoursAndMinutes,
  tasksSummary,
} from '../../../../utils';

const average = (taskTime: number, totalHours: number) =>
  taskTime / (totalHours / 168);
const percentage = (taskTime: number, totalHours: number) =>
  (taskTime / totalHours) * 100;

const initialQueryVariables: TasksArgs = {
  scope: 30,
  startDate: undefined,
  endDate: undefined,
  comparePrev: false,
};

const useStatisticsData = () => {
  const [queryVariables, setQueryVariables] = useState<TasksArgs>(
    initialQueryVariables
  );
  const [tasks, setTasks] = useState<TasksDataWithMarginAndWidth | undefined>();

  const { scope, startDate, endDate, comparePrev } = queryVariables;
  const { loading, error } = useQuery<TasksRes, TasksArgs>(TasksQuery, {
    variables: {
      scope: scope ? scope + 1 : undefined,
      startDate: startDate
        ? moment(startDate).subtract(1, 'days').toISOString()
        : undefined,
      endDate: endDate
        ? moment(endDate).add(1, 'days').toISOString()
        : undefined,
      comparePrev,
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

  const range =
    startDate && endDate
      ? moment.duration(moment(endDate).diff(moment(startDate))).asDays()
      : undefined;

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment(endDate)
    .subtract(range || (scope && scope - 1), 'days')
    .format('x');
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment(endDate).add(1, 'days').format('x');
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // get a summary of the tasks by group
  const groups = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);

  // calc total time of summarised tasks
  const groupsCopy = groups ? [...groups] : [];
  const totalTime = groupsCopy.reduce((total, current) => {
    return total + current.totalTime;
  }, 0);

  // get total as hours and mins
  const totalRecorded = hoursToHoursAndMinutes(totalTime);
  const totalPossible = durationInHours(
    moment(startDateToDisplay),
    moment(endDateToDisplay)
  );

  groups?.sort((a, b) => a.totalTime - b.totalTime);
  groups?.unshift({
    color: '#f1f1f1',
    group: 'Unused',
    totalTime: totalPossible - totalTime,
    totalAsPercentage: percentage(totalPossible, totalTime),
    averagePerWeek: average(totalPossible, totalTime),
    tasks: {},
  });

  return {
    state: {
      loading,
      error,
      groups,
      totalRecorded,
      totalPossible,
      startDate: startDateToDisplay,
      endDate: endDateToDisplay,
    },
    actions: {
      setQueryVariables,
    },
  };
};

export default useStatisticsData;
