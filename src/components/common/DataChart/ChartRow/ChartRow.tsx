import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DataBar from "./DataBar";

import { base } from "../../../../styles";
import { DataArray } from "../../../../types/data";
const { colors } = base;

interface Props extends DataArray {
  date: number;
}

// expects width, marginLeft and color for each item to be rendered on the chart row
const ChartRow: React.FC<Props> = ({ date, data }) => {
  const renderedBars = data?.map((e, i) => {
    return (
      <DataBar
        key={i}
        data={{ color: e.color, width: e.width, margin: e.margin }}
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
