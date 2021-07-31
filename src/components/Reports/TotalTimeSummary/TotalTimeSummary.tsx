import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../../styles";

interface Props {
  title: string;
  time: number;
}

const TotalTimeSummary: React.FC<Props> = ({ title, time }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.hours}> hours</Text>
      </View>
    </View>
  );
};

export default TotalTimeSummary;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 3,
  },
  title: {
    fontSize: 20,
    color: colors.headingSecondary,
    fontFamily: "lato-light",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 24,
    color: colors.headingSecondary,
    fontFamily: "lato-light",
  },
  hours: {
    fontSize: 18,
    color: colors.headingSecondary,
    fontFamily: "lato-light",
  },
});
