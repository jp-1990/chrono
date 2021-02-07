import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ChartColumn from "./ChartColumn/ChartColumn";

import base from "../../../styles/base";
const { colors } = base;

const BarChart = ({ data }) => {
  const width = 100 / data.length;

  const chartColumns = [];
  for (let i = 0, j = data.length; i < j; i++) {
    chartColumns.push(
      <ChartColumn key={i} width={width} data={data[i][i + 1]} />
    );
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.top}>
        <View style={styles.chart}>{chartColumns}</View>
        <View style={styles.yAxis}>
          <Text style={styles.labels}>12</Text>
          <Text style={styles.labels}>8</Text>
          <Text style={styles.labels}>4</Text>
          <Text style={styles.labels}> </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.xAxis}>
          <View style={styles.xAxisText}>
            <Text style={styles.labels}>1</Text>
            <Text style={styles.labels}>jan</Text>
          </View>
          <View style={styles.xAxisText}>
            <Text style={styles.labels}>31</Text>
            <Text style={styles.labels}>jan</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  chartContainer: { width: "100%", height: 250, marginVertical: 20 },
  top: { flexDirection: "row", width: "100%", height: "85%" },
  chart: {
    width: "91%",
    height: "97%",
    marginLeft: "4%",
    marginTop: "3%",
    borderRightColor: colors.headingSecondary,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.headingSecondary,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 1,
  },
  labels: {
    color: colors.headingSecondary,
    textTransform: "capitalize",
  },
  yAxis: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "1%",
  },
  bottom: {},
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "1%",
  },
  xAxisText: {
    alignItems: "center",
  },
});
