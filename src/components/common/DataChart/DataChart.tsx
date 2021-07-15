import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

import ChartRow from "./ChartRow/ChartRow";

import { TasksDataWithMarginAndWidth } from "../../../types/data";
import { addDayUnixString } from "../../../utils";
import { base } from "../../../styles";
const { colors } = base;

interface Props {
  start: number;
  end: number;
  data: TasksDataWithMarginAndWidth | undefined;
}

const DataChart: React.FC<Props> = ({ data, start, end }) => {
  const chartRows = [];
  let unixDay = start;
  let safety = 0;
  // build array of chart rows to render
  while (safety < 100 && unixDay !== end) {
    const date = moment(Number(unixDay)).date();
    const rowData = data && data[unixDay];
    chartRows.push(<ChartRow key={safety} date={date} data={rowData} />);
    unixDay = addDayUnixString(unixDay);
    safety++;
  }

  return (
    <View style={styles.container}>
      <View style={styles.timesHeader}>
        <Text style={styles.times}>00:00</Text>
        <Text style={styles.times}>08:00</Text>
        <Text style={styles.times}>17:00</Text>
        <Text style={styles.times}>24:00</Text>
      </View>
      {chartRows}
    </View>
  );
};

export default DataChart;

const styles = StyleSheet.create({
  container: {
    color: "#000",
    height: "auto",
    marginBottom: 30,
  },
  timesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginVertical: 10,
  },
  times: {
    color: colors.headingSecondary,
  },
});
