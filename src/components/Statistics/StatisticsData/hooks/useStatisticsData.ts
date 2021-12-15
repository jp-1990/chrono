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
    .subtract(6, 'days')
    .toISOString(),
  endDate: moment({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  }).toISOString(),
  comparePrev: true,
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
        ? moment(endDate).add(2, 'days').toISOString()
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
  const startDateUnix = moment(startDate).format('x');
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment(endDate).add(1, 'days').format('x');
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // dates for prev N days
  const prevStartDateUnix = moment(startDate)
    .subtract((range || 0) + 1, 'days')
    .format('x');
  const prevStartDateToDisplay =
    convertDateToMidnightUnixString(prevStartDateUnix);
  const prevEndDateUnix = moment(startDate).format('x');
  const prevEndDateToDisplay = convertDateToMidnightUnixString(prevEndDateUnix);

  // get a summary of the tasks by group
  const groups = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);
  const prevGroups = tasksSummary(
    tasks,
    prevStartDateToDisplay,
    prevEndDateToDisplay
  );

  // calc total time of summarised tasks
  const groupsCopy = groups ? [...groups] : [];
  const totalTime = groupsCopy.reduce((total, current) => {
    return total + current.totalTime;
  }, 0);
  // calc total time of summarised tasks
  const prevGroupsCopy = prevGroups ? [...prevGroups] : [];
  const prevTotalTime = prevGroupsCopy.reduce((total, current) => {
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
    group: 'unused',
    totalTime: totalPossible - totalTime,
    totalAsPercentage: percentage(totalPossible - totalTime, totalPossible),
    averagePerWeek: average(totalPossible - totalTime, totalPossible),
    tasks: {
      unused: {
        totalTime: totalPossible - totalTime,
        totalAsPercentage: 100,
        averagePerWeek: average(totalPossible - totalTime, totalPossible),
        color: '#f1f1f1',
      },
    },
  });

  prevGroups?.sort((a, b) => a.totalTime - b.totalTime);
  prevGroups?.unshift({
    color: '#f1f1f1',
    group: 'unused',
    totalTime: totalPossible - prevTotalTime,
    totalAsPercentage: percentage(totalPossible - prevTotalTime, totalPossible),
    averagePerWeek: average(totalPossible - prevTotalTime, totalPossible),
    tasks: {
      unused: {
        totalTime: totalPossible - prevTotalTime,
        totalAsPercentage: 100,
        averagePerWeek: average(totalPossible - prevTotalTime, totalPossible),
        color: '#f1f1f1',
      },
    },
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
      prevGroups,
      range,
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
