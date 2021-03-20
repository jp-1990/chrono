import React from "react";
import { Text, StyleSheet } from "react-native";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  text: string;
}

const Title: React.FC<Props> = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  text: {
    fontFamily: "lato-light",
    fontSize: 38,
    color: colors.headingSecondary,
    textTransform: "uppercase",
  },
});
