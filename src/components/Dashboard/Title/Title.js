import React from "react";
import { Text, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { colors } = base;

const Title = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    fontFamily: "lato-light",
    fontSize: 40,
    color: colors.headingSecondary,
    textTransform: "uppercase",
  },
});
