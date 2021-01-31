import React from "react";
import { View, Text, StyleSheet } from "react-native";

import base from "../../../styles/base";

const AppTitle = ({ title1, title2, subtitle }) => {
  return (
    <View style={styles.titleBox}>
      <Text style={styles.title}>{title1}</Text>
      <Text style={styles.title}>{title2}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default AppTitle;

const styles = StyleSheet.create({
  titleBox: { padding: 54 },
  title: {
    fontFamily: "lato-light",
    textTransform: "uppercase",
    fontSize: 42,
    color: base.colors.headingPrimary,
  },
  subtitle: {
    fontFamily: "lato-light",
    color: base.colors.textSecondary,
    fontSize: 18,
  },
});
