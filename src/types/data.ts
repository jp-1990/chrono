export type DataTypes = {
  color: string;
  width: string;
  margin: string | undefined;
};

export type DataArray = {
  data: { color: string; width: string; margin: string | undefined }[];
};

export type ActivityTypes = {
  activity: { color?: string; title: string; total: number };
};

export type BarChartTypes = {
  chartBar: {
    color: string;
    height: number | string;
  };
};
