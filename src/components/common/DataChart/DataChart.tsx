import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

import ChartRow from "./ChartRow/ChartRow";

import { DataTypes } from "../../../types/data";
import { base } from "../../../styles";
const { colors } = base;

interface Props {
  start: string;
  end: string;
  data: { [name: number]: DataTypes[] }[];
}

const DataChart: React.FC<Props> = ({ data, start, end }) => {
  // let date = 8 || 1;
  // const iterations = 7 || data.length;

  // const chartRows = [];
  // for (let i = 0; i < iterations; i++) {
  //   if (date === 32) date = 1;
  //   chartRows.push(
  //     <ChartRow key={i} date={date} data={data[date - 1][date]} />
  //   );
  //   date++;
  // }

  const addDayUnixString = (date: number | string) => {
    return moment(
      moment(Number(date)).add(1, "days").format("YYYY-MM-DD")
    ).format("x");
  };

  // // start as unix
  // // data = taskData
  const chartRows = [];
  let unixDay = start;
  let safety = 0;
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
