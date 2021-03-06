import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ChartRow from "./ChartRow/ChartRow";

import { DataTypes } from "../../../types/data";
import base from "../../../styles/base";
const { colors } = base;

interface Props {
  start: number;
  num: number;
  data: { [name: number]: DataTypes[] }[];
}

const DataChart: React.FC<Props> = ({ data, start, num }) => {
  let date = start || 1;
  const iterations = num || data.length;

  const chartRows = [];
  for (let i = 0; i < iterations; i++) {
    if (date === 32) date = 1;
    chartRows.push(
      <ChartRow key={i} date={date} data={data[date - 1][date]} />
    );
    date++;
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
