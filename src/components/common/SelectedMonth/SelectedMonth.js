import React from "react";
import { Text, StyleSheet } from "react-native";

import MonthSelector from "../MonthSelector/MonthSelector";

import base from "../../../styles/base";
const { colors } = base;

const SelectedMonth = ({ month, year }) => {
  const Left = () => {
    return <Text style={styles.month}>{month.substring(0, 3)} </Text>;
  };

  const Right = () => {
    return <Text style={styles.year}>{year}</Text>;
  };

  return (
    <MonthSelector Left={<Left />} Right={<Right />} flexDirection="row" />
  );
};

export default SelectedMonth;

const styles = StyleSheet.create({
  month: {
    fontFamily: "lato-bold",
    fontSize: 12,
    color: colors.backgroundColor,
    textTransform: "uppercase",
  },
  year: {
    fontFamily: "lato-light",
    fontSize: 12,
    color: colors.backgroundColor,
  },
});
