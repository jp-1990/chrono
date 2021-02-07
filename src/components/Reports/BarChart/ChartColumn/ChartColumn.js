import React from "react";
import { View, StyleSheet } from "react-native";

import ChartBar from "./ChartBar";

const ChartColumn = ({ data, width }) => {
  const column = data.map((e, i) => {
    return <ChartBar key={i} color={e.color} height={e.height} />;
  });

  return (
    <View style={{ ...styles.columnContainer, width: `${width}%` }}>
      {column}
    </View>
  );
};

export default ChartColumn;

const styles = StyleSheet.create({
  columnContainer: {
    paddingLeft: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
});
