import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../../styles";

interface Props {
  title1: string;
  title2?: string;
  subtitle: string;
}

const AppTitle: React.FC<Props> = ({ title1, title2, subtitle }) => {
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
    color: colors.headingPrimary,
  },
  subtitle: {
    fontFamily: "lato-light",
    color: colors.textSecondary,
    fontSize: 18,
  },
});
