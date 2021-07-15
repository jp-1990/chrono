import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DataBar from "./DataBar";

import { base } from "../../../../styles";
import { TaskDataWithMarginAndWidth } from "../../../../types/data";
const { colors } = base;

interface Props {
  date: number;
  data: TaskDataWithMarginAndWidth[] | undefined;
}

const ChartRow: React.FC<Props> = ({ date, data }) => {
  // create array of databars to render in row
  const renderedBars = data?.map((el, i) => {
    return <DataBar key={i} data={el} />;
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
