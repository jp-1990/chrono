export type ActivityTypes = {
  activity: { color?: string; title: string; total: number };
};

export type BarChartTypes = {
  chartBar: {
    color: string;
    height: number | string;
  };
};

export interface TaskAPIResponse {
  id: string;
  title: string;
  group: string;
  description?: string;
  colour: string;
  start: string;
  end: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  percentageTimes: {
    endPercentage: number;
    startPercentage: number;
  };
  luminance: number;
}

export type TaskDataStructure = {
  color: string;
  luminance: number;
  group?: string;
  id: string;
  percentageTimes: {
    endPercentage: number;
    startPercentage: number;
  };
  title: string;
  start: number;
  end: number;
};

export type TasksDataStructure = {
  [key: string]: TaskDataStructure[];
};

export type TaskDataWithMarginAndWidth = TaskDataStructure & {
  width: string;
  marginLeft: string;
};

export type TasksDataWithMarginAndWidth = {
  [key: string]: TaskDataWithMarginAndWidth[];
};

export type TaskSummary = {
  totalTime: number;
  totalAsPercentage: number;
  averagePerWeek: number;
};

export type GroupSummary = TaskSummary & {
  color: string;
  tasks: { [key: string]: TaskSummary };
};

export type GroupSummaryWithName = GroupSummary & {
  group: string;
};
