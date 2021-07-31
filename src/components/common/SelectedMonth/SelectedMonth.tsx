import React from "react";
import { Text, StyleSheet } from "react-native";

import MonthSelector from "../MonthSelector/MonthSelector";

import { colors } from "../../../styles";

interface Props {
  month: string;
  year: number;
}

const SelectedMonth: React.FC<Props> = ({ month, year }) => {
  const Left = () => {
    return <Text style={styles.month}>{month.substring(0, 3)} </Text>;
  };

  const Right = () => {
    return <Text style={styles.year}>{year}</Text>;
  };

  return <MonthSelector Left={<Left />} Right={<Right />} />;
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
