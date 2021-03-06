import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DataBar from "./DataBar";

import base from "../../../../styles/base";
const { colors } = base;

// expects data containing at least a width and marginLeft as percentages
const ChartRow = ({ date, data }) => {
  const renderedBars = data?.map((e, i) => {
    return (
      <DataBar
        key={i}
        color={e.color}
        data={{ width: e.width, margin: e.margin }}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <View style={styles.dataBars}>{renderedBars}</View>
    </View>
  );
};

export default ChartRow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
  },
  date: {
    width: "10%",
    color: colors.headingSecondary,
  },
  dataBars: {
    width: "85%",
    height: 20,
    flexDirection: "row",
  },
});
