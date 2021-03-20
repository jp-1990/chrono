import React from "react";
import { Text, StyleSheet } from "react-native";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  text: string;
}

const Subtitle: React.FC<Props> = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default Subtitle;

const styles = StyleSheet.create({
  text: {
    fontFamily: "lato-light",
    fontSize: 30,
    color: colors.headingSecondary,
    textTransform: "uppercase",
  },
});
