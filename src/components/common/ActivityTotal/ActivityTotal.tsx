import React from "react";
import { View, Text, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { colors } = base;

// basic summary of activity containing title, color and total hours
const ActivityTotal = ({ color, title, total, totalVisible }) => {
  let renderTitle;
  if (title.length > 10) {
    renderTitle = `${title.substring(0, 7)}...`;
  } else {
    renderTitle = title;
  }
  return (
    <View style={styles.container}>
      <View style={{ ...styles.color, backgroundColor: color }}></View>
      <Text style={styles.title}>{renderTitle}</Text>
      {totalVisible ? (
        <Text style={styles.total}>[ {total} hours ]</Text>
      ) : null}
    </View>
  );
};

export default ActivityTotal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 4,
  },
  color: {
    width: 22,
    height: 22,
  },
  title: {
    textTransform: "capitalize",
    width: 80,
    marginHorizontal: 10,
    color: colors.textPrimary,
  },
  total: {
    color: colors.headingPrimary,
  },
});
