import React from "react";
import { Text, StyleSheet } from "react-native";

import DateContainer from "../../common/DateContainer/DateContainer";

import base from "../../../styles/base";
const { colors } = base;

const SelectedMonth = ({ month, year }) => {
  const Top = () => {
    return <Text style={styles.month}>{month.substring(0, 3)} </Text>;
  };

  const Bottom = () => {
    return <Text style={styles.year}>{year}</Text>;
  };

  return <DateContainer Top={<Top />} Bottom={<Bottom />} />;
};

export default SelectedMonth;

const styles = StyleSheet.create({
  wrapper: { width: 66, height: 53, justifyContent: "space-between" },
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
