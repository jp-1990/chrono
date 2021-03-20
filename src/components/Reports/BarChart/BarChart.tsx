import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ChartColumn from "./ChartColumn/ChartColumn";
import { BarChartTypes } from "../../../types";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  data: { [name: string]: BarChartTypes["chartBar"][] }[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const width = 100 / data.length;

  const chartColumns = [];
  for (let i = 0, j = data.length; i < j; i++) {
    chartColumns.push(
      <ChartColumn
        key={i}
        width={18}
        date={i + 1}
        max={data.length}
        data={data[i][i + 1]}
      />
    );
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.top}>
        <View style={styles.chart}>
          <ScrollView
            horizontal={true}
            style={{ height: "auto" }}
            showsHorizontalScrollIndicator={false}
          >
            {chartColumns}
          </ScrollView>
        </View>
        <View style={styles.yAxisLine}></View>
        <View style={styles.yAxis}>
          <Text style={styles.labels}>12</Text>
          <Text style={styles.labels}>8</Text>
          <Text style={styles.labels}>4</Text>
          <Text style={styles.labels}>0</Text>
        </View>
      </View>
      <View style={styles.xAxis}>
        <Text style={styles.xAxisLabel}>january</Text>
      </View>
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  chartContainer: { width: "100%", height: 250, marginVertical: 20 },
  top: { flexDirection: "row", width: "100%", height: "90%" },
  chart: {
    width: "91%",
    height: "97%",
    marginLeft: "4%",
    marginTop: "3%",
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
    paddingBottom: 12,
  },
  yAxisLine: {
    borderLeftColor: colors.headingSecondary,
    borderLeftWidth: 1,
    marginBottom: 22,
  },
  xAxis: {
    height: "10%",
    marginTop: 8,
    alignItems: "center",
  },
  xAxisLabel: {
    textTransform: "capitalize",
    color: colors.headingSecondary,
    fontFamily: "lato-light",
    fontSize: 22,
  },
});
