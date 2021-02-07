import React from "react";
import { Text, StyleSheet } from "react-native";

import DateContainer from "../../common/DateContainer/DateContainer";

import base from "../../../styles/base";
const { colors } = base;

const DateRange = ({ start, end }) => {
  const Top = () => {
    return (
      <>
        <Text style={styles.month}>{start.month.substring(0, 3)} </Text>
        <Text style={styles.date}>{start.date}</Text>
      </>
    );
  };

  const Bottom = () => {
    return (
      <>
        <Text style={styles.month}>{end.month.substring(0, 3)} </Text>
        <Text style={styles.date}>{end.date}</Text>
      </>
    );
  };

  return <DateContainer Top={<Top />} Bottom={<Bottom />} />;
};

export default DateRange;

const styles = StyleSheet.create({
  wrapper: { width: 66, height: 53, justifyContent: "space-between" },
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
