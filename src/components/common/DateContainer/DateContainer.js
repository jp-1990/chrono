import React from "react";
import { View, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { colors } = base;

const DateContainer = ({ Top, Bottom }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.dateBox}>{Top}</View>
      <View style={styles.dateBox}>{Bottom}</View>
    </View>
  );
};

export default DateContainer;

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
});
