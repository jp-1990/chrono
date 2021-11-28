import { useQuery } from "@apollo/client";
import moment from "moment";
import {
  FindTasksQuery,
  FindTasksRes,
  FindTasksArgs,
} from "../graphql/queries";
import {
  buildTasksDataStructure,
  convertDateToMidnightUnixString,
  tasksSummary,
} from "../utils";

export const useDashboard = () => {
  const { data, loading, error } = useQuery<FindTasksRes, FindTasksArgs>(
    FindTasksQuery,
    {
      variables: {
        scope: 10,
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  // build the data structure to display in app
  const tasks = buildTasksDataStructure(data);

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment().subtract(6, "days").format("x");
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment().add(1, "days").format("x");
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  // get a summary of the tasks by group
  const summary = tasksSummary(tasks, startDateToDisplay, endDateToDisplay);

  // calc total time of summarised tasks
  const totalTime =
    summary &&
    [...summary].reduce((total, current) => {
      return total + current.totalTime;
    }, 0);

  return {
    tasks: {
      data: tasks,
      summary,
      loading,
      error,
      totalTime,
    },
    startDate: startDateToDisplay,
    endDate: endDateToDisplay,
  };
};
