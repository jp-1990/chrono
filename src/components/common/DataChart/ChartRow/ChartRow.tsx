import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DataBar from "./DataBar";

import { colors } from "../../../../styles";
import { TaskDataWithMarginAndWidth } from "../../../../types/data";

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
      <View style={styles.dataBars}>{renderedBars}</View>
    </View>
  );
};

export default ChartRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 20,
    flex: 1,
  },
  dataBars: {
    height: 22,
    flexDirection: "row",
    flex: 1,
  },
});
