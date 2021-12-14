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
import { DateTimePickerTypes } from '../../../Common';

const average = (taskTime: number, totalHours: number) =>
  taskTime / (totalHours / 168);
const percentage = (taskTime: number, totalHours: number) =>
  (taskTime / totalHours) * 100;

const now = new Date(Date.now());
const initialQueryVariables: TasksArgs = {
  startDate: moment({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  })
    .subtract(10, 'days')
    .toISOString(),
  endDate: moment({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  }).toISOString(),
  comparePrev: false,
};

const useStatisticsData = () => {
  const [queryVariables, setQueryVariables] = useState<TasksArgs>(
    initialQueryVariables
  );
  const [tasks, setTasks] = useState<TasksDataWithMarginAndWidth | undefined>();
  const [show, setShow] = useState(false);
  const [target, setTarget] =
    useState<DateTimePickerTypes['target']>('startTime');

  const { startDate, endDate, comparePrev } = queryVariables;
  const { loading, error } = useQuery<TasksRes, TasksArgs>(TasksQuery, {
    variables: {
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
  const startDateUnix = moment(endDate).subtract(range, 'days').format('x');
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

  // dateTime picker handlers
  const onDateTimeChange = (_: Event, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setShow(false);
      return;
    }
    setShow(false);
    setQueryVariables((prev) => {
      return {
        ...prev,
        startDate:
          target === 'startDate' ? selectedDate.toISOString() : prev.startDate,
        endDate:
          target === 'endDate' ? selectedDate.toISOString() : prev.endDate,
      };
    });
  };
  const showPicker = (label: DateTimePickerTypes['target']) => {
    setTarget(label);
    setShow(true);
  };

  return {
    state: {
      loading,
      error,
      groups,
      totalRecorded,
      totalPossible,
      queryVariables,
      startDate: startDateToDisplay,
      endDate: endDateToDisplay,
      pickerVisible: show,
      pickerTarget: target,
    },
    actions: {
      setQueryVariables,
      onDateTimeChange,
      showPicker,
    },
  };
};

export default useStatisticsData;
