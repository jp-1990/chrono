import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ChartRow from "./ChartRow/ChartRow";

import base from "../../../styles/base";
const { colors } = base;

const DataChart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timesHeader}>
        <Text style={styles.times}>00:00</Text>
        <Text style={styles.times}>08:00</Text>
        <Text style={styles.times}>17:00</Text>
        <Text style={styles.times}>24:00</Text>
      </View>
      <ChartRow
        date={27}
        data={[
          { color: "blue", width: "14%", margin: null },
          { color: "green", width: "35%", margin: "8%" },
          { color: "blue", width: "10%", margin: "33%" },
        ]}
      />
      <ChartRow
        date={28}
        data={[
          { color: "blue", width: "12%", margin: null },
          { color: "green", width: "35%", margin: "10%" },
          { color: "blue", width: "13%", margin: "30%" },
        ]}
      />
      <ChartRow
        date={29}
        data={[
          { color: "blue", width: "14%", margin: null },
          { color: "green", width: "35%", margin: "8%" },
          { color: "red", width: "25%", margin: "6%" },
          { color: "blue", width: "10%", margin: "2%" },
        ]}
      />
      <ChartRow
        date={30}
        data={[
          { color: "blue", width: "35%", margin: null },
          { color: "red", width: "28%", margin: "7%" },
          { color: "blue", width: "10%", margin: "20%" },
        ]}
      />
      <ChartRow
        date={31}
        data={[
          { color: "blue", width: "35%", margin: null },
          { color: "red", width: "20%", margin: "10%" },
          { color: "red", width: "28%", margin: "2%" },
          { color: "blue", width: "2%", margin: "3%" },
        ]}
      />
      <ChartRow
        date={1}
        data={[
          { color: "blue", width: "12%", margin: null },
          { color: "green", width: "35%", margin: "10%" },
          { color: "blue", width: "13%", margin: "30%" },
        ]}
      />
      <ChartRow
        date={2}
        data={[
          { color: "blue", width: "12%", margin: null },
          { color: "green", width: "35%", margin: "10%" },
          { color: "blue", width: "13%", margin: "30%" },
        ]}
      />
    </View>
  );
};

export default DataChart;

const styles = StyleSheet.create({
  container: {
    color: "#000",
    height: 250,
    marginBottom: 40,
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
