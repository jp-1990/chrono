import React from "react";
import { View, Text, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { colors } = base;

const TotalTime = ({ total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>total</Text>
      <Text style={styles.total}>[ {total} hours ]</Text>
    </View>
  );
};

export default TotalTime;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  title: {
    textTransform: "uppercase",
    fontFamily: "lato-light",
    color: colors.headingSecondary,
    fontSize: 30,
  },
  total: {
    color: colors.headingPrimary,
    fontFamily: "lato-bold",
    fontSize: 20,
    marginHorizontal: 4,
    marginTop: 6,
  },
});
