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
} from "../utils";

export const useDashboard = () => {
  const { data, loading, error } = useQuery<FindTasksRes, FindTasksArgs>(
    FindTasksQuery,
    {
      variables: {
        scope: 10,
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const tasks = buildTasksDataStructure(data);
  console.log(tasks);

  // convert start and end date to display to unix for indexing task data structure
  const startDateUnix = moment().subtract(6, "days").format("x");
  const startDateToDisplay = convertDateToMidnightUnixString(startDateUnix);
  const endDateUnix = moment().add(1, "days").format("x");
  const endDateToDisplay = convertDateToMidnightUnixString(endDateUnix);

  return {
    tasks: {
      data: tasks,
      loading,
      error,
    },
    startDate: startDateToDisplay,
    endDate: endDateToDisplay,
  };
};
