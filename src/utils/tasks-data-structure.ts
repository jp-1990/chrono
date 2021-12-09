import {
  convertDateToMidnightUnixString,
  addDayUnixString,
  startOfDay,
  endOfDay,
} from './date-format';
import {
  TaskAPIResponse,
  TaskDataStructure,
  TasksDataStructure,
  TasksDataWithMarginAndWidth,
} from '../types';

const addLeftMarginAndWidth = (
  data: TasksDataStructure
): TasksDataWithMarginAndWidth | undefined => {
  if (!data) return undefined;
  const calcLeftMargin = (prev: TaskDataStructure, item: TaskDataStructure) => {
    return `${
      item.percentageTimes.startPercentage - prev.percentageTimes.endPercentage
    }%`;
  };
  const output = { ...data };
  const keys = Object.keys(data);
  // loop over each key and access its array
  keys.forEach((key) => {
    // map the array and add margin and width properties
    output[key] = output[key].map((el, i, arr) => {
      let marginLeft = `${el.percentageTimes.startPercentage}%`;
      if (i !== 0) marginLeft = calcLeftMargin(arr[i - 1], el);
      const width = `${
        el.percentageTimes.endPercentage - el.percentageTimes.startPercentage
      }%`;
      return { ...el, width, marginLeft };
    });
  });
  return output as TasksDataWithMarginAndWidth;
};

export const buildTasksDataStructure = (
  data: { tasks: TaskAPIResponse[] } | undefined
) => {
  if (!data) return undefined;
  const taskData: TasksDataStructure = {};
  // loop over data returned from query
  data.tasks.forEach((el) => {
    // keys are the day at midnight that the task starts or ends as a unix string
    const taskStartKey = convertDateToMidnightUnixString(el.start);
    const taskEndKey = convertDateToMidnightUnixString(el.end);

    // if the start key doesnt exist yet, assign an empty array to it
    if (taskData[taskStartKey] === undefined) taskData[taskStartKey] = [];

    // if the task ends on a different day to when it starts
    if (taskStartKey !== taskEndKey) {
      // if the end key doesnt exist yet, assign an empty array to it
      if (taskData[taskEndKey] === undefined) taskData[taskEndKey] = [];
      // push start of task, from start time to midnight on first day
      taskData[taskStartKey].push({
        id: el.id,
        title: el.title,
        group: el.group,
        description: el.description,
        percentageTimes: { ...el.percentageTimes, endPercentage: 100 },
        color: el.colour,
        luminance: el.luminance,
        start: +el.start,
        end: endOfDay(+el.start),
      });
      const keyTracker = addDayUnixString(taskStartKey);
      // while covers situation where task spans any number of days
      while (taskEndKey !== keyTracker) {
        // if the tracker key doesnt exist yet, assign an empty array to it
        if (taskData[keyTracker] === undefined) taskData[keyTracker] = [];
        // push task with start and end covering entire day
        taskData[keyTracker].push({
          id: el.id,
          title: el.title,
          group: el.group,
          description: el.description,
          percentageTimes: {
            ...el.percentageTimes,
            startPercentage: 0,
            endPercentage: 100,
          },
          color: el.colour,
          luminance: el.luminance,
          start: startOfDay(Number(keyTracker)),
          end: endOfDay(Number(keyTracker)),
        });
      }
      // push end of task, from midnight until end time on end day
      taskData[taskEndKey].push({
        id: el.id,
        title: el.title,
        group: el.group,
        description: el.description,
        percentageTimes: { ...el.percentageTimes, startPercentage: 0 },
        color: el.colour,
        luminance: el.luminance,
        start: startOfDay(Number(el.end)),
        end: +el.end,
      });
    } else {
      // if the task starts and ends on the same day, push to that key
      taskData[taskStartKey].push({
        id: el.id,
        title: el.title,
        group: el.group,
        description: el.description,
        percentageTimes: { ...el.percentageTimes },
        color: el.colour,
        luminance: el.luminance,
        start: +el.start,
        end: +el.end,
      });
    }
  });

  return addLeftMarginAndWidth(taskData);
};
