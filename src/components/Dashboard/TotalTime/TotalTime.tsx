import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Subtitle from "../../Common/Subtitle/Subtitle";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  total: {
    hours: number;
    minutes: number;
  };
}

const TotalTime: React.FC<Props> = ({ total }) => {
  return (
    <View style={styles.container}>
      <Subtitle text="total" />
      <Text style={styles.total}>[ {total.hours} hours ]</Text>
      <Text style={styles.total}> + {total.minutes} mins ]</Text>
    </View>
  );
};

export default TotalTime;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginTop: 15,
  },
  total: {
    color: colors.headingPrimary,
    fontFamily: "lato-bold",
    fontSize: 20,
    marginHorizontal: 4,
    marginTop: 6,
  },
});
