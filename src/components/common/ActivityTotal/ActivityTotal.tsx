import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  color: string;
  title: string;
  total: number;
  totalVisible?: boolean;
}

// basic summary of activity containing title, color and total hours
const ActivityTotal: React.FC<Props> = ({
  color,
  title,
  total,
  totalVisible,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.color, backgroundColor: color }}></View>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
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
