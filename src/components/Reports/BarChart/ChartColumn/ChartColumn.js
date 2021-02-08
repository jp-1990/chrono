import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ChartBar from "./ChartBar";

import base from "../../../../styles/base";
const { colors } = base;

const ChartColumn = ({ data, width, date, max }) => {
  const column = data.map((e, i) => {
    return <ChartBar key={i} color={e.color} height={e.height} />;
  });

  // date display logic (seperate later?)
  let displayDate = null;
  if (date === 1) displayDate = 1;
  if (date === max) displayDate = max;
  if ((date - 1) % 6 === 0) displayDate = date;

  return (
    <>
      <View style={{ ...styles.columnContainer, width: width }}>
        {column}
        <View style={styles.line}></View>
        <View style={styles.center}>
          <Text style={styles.label}>{displayDate}</Text>
        </View>
      </View>
    </>
  );
};

export default ChartColumn;

const styles = StyleSheet.create({
  columnContainer: {
    paddingLeft: 1,
    height: "100%",
    justifyContent: "flex-end",
    position: "relative",
  },
  line: {
    marginTop: 1,
    width: "110%",
    borderTopColor: colors.headingSecondary,
    borderTopWidth: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors.headingSecondary,
    marginTop: 4,
  },
});
