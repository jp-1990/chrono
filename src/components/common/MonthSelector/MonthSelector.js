import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import base from "../../../styles/base";
const { colors } = base;

const MonthSelector = ({ Left, Right }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <MaterialIcons
          name="arrow-left"
          size={28}
          color={colors.headingSecondary}
        />
        <View style={styles.dateBox}>{Left}</View>
        <MaterialIcons
          name="arrow-right"
          size={28}
          color={colors.headingSecondary}
        />
      </View>
      <View style={styles.container}>
        <MaterialIcons
          name="arrow-left"
          size={28}
          color={colors.headingSecondary}
        />
        <View style={styles.dateBox}>{Right}</View>
        <MaterialIcons
          name="arrow-right"
          size={28}
          color={colors.headingSecondary}
        />
      </View>
    </View>
  );
};

export default MonthSelector;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: 208,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dateBox: {
    height: 24,
    width: 70,
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.menuSecondary,
  },
});
