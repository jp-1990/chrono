import moment from "moment";
import { durationInHours } from "./date-format";
import {
  TasksDataWithMarginAndWidth,
  TaskDataWithMarginAndWidth,
  GroupSummary,
  GroupSummaryWithName,
} from "../types";

const addToGroupsSummary = (args: {
  group: string;
  groups: { [key: string]: GroupSummary };
  title: string;
  duration: number;
  totalHours: number;
  color: string;
}) => {
  const { group, groups, title, duration, totalHours, color } = args;
  const average = (taskTime: number, totalHours: number) =>
    (totalHours / 168) * taskTime;
  const percentage = (taskTime: number, totalHours: number) =>
    (taskTime / totalHours) * 100;

  let prev: GroupSummary = {
    totalTime: 0,
    totalAsPercentage: 0,
    averagePerWeek: 0,
    color: "",
    tasks: {},
  };
  if (groups[group]) prev = { ...groups[group] } as GroupSummary;

  const totalTime = prev ? prev.totalTime + duration : duration;
  const totalAsPercentage = percentage(totalTime, totalHours);
  const averagePerWeek = average(totalTime, totalHours);
  groups[group] = {
    ...prev,
    color,
    totalTime,
    totalAsPercentage,
    averagePerWeek,
  };

  const prevTaskValues = groups[group].tasks[title];
  const taskTotalTime = prevTaskValues
    ? prevTaskValues.totalTime + duration
    : duration;
  const taskTotalAsPercentage = percentage(taskTotalTime, totalHours);
  const taskAveragePerWeek = average(taskTotalTime, totalHours);

  groups[group].tasks = {
    ...groups[group].tasks,
    [title]: {
      totalTime: taskTotalTime,
      totalAsPercentage: taskTotalAsPercentage,
      averagePerWeek: taskAveragePerWeek,
    },
  };
};

export const tasksSummary = (
  data: TasksDataWithMarginAndWidth | undefined,
  startDate: number,
  endDate: number
): GroupSummaryWithName[] | undefined => {
  if (!data) return;

  // flatten the input object into an array
  const input: TaskDataWithMarginAndWidth[] = [];
  Object.keys(data).forEach((el) => {
    data[el].forEach((e) => {
      if (
        moment(Number(e.start)).isSameOrAfter(startDate) &&
        moment(Number(e.end)).isSameOrBefore(endDate)
      ) {
        input.push(e);
      }
    });
  });

  const totalHours = durationInHours(moment(startDate), moment(endDate));
  const groups: { [key: string]: GroupSummary } = {};

  input.forEach((el, i) => {
    const { group, title, start, end, color } = el;
    const duration = durationInHours(
      moment(Number(start)),
      moment(Number(end))
    );
    if (group) {
      addToGroupsSummary({ group, groups, title, duration, totalHours, color });
    } else {
      addToGroupsSummary({
        group: "other",
        groups,
        title,
        duration,
        totalHours,
        color,
      });
    }
  });

  // output - sorted array that can be reliably sliced for top 3 groups
  const output = Object.keys(groups).map((el) => ({
    ...groups[el],
    group: el,
  }));
  output.sort((a, b) => b.totalTime - a.totalTime);

  return output;
};
