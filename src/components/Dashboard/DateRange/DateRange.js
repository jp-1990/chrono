import React from "react";
import { View, Text, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { colors } = base;

const DateRange = ({ start, end }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.dateBox}>
        <Text style={styles.month}>{start.month.substring(0, 3)} </Text>
        <Text style={styles.date}>{start.date}</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.month}>{end.month.substring(0, 3)} </Text>
        <Text style={styles.date}>{end.date}</Text>
      </View>
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  wrapper: { width: 66, height: 53, justifyContent: "space-between" },
  dateBox: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.menuSecondary,
  },
  month: {
    fontFamily: "lato-bold",
    fontSize: 12,
    color: colors.backgroundColor,
    textTransform: "uppercase",
  },
  date: {
    fontFamily: "lato-light",
    fontSize: 12,
    color: colors.backgroundColor,
  },
});
