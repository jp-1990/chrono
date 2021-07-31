import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../Text/Text";
import { colors } from "../../../styles";

interface Props {
  color: string;
  title: string;
  total?: { hours: number; minutes: number };
}

// basic summary of activity containing title, color and total hours
const ActivityTotal: React.FC<Props> = ({ color, title, total }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.color, backgroundColor: color }}></View>
      <Text
        variant="sp"
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      {total ? (
        <Text variant="sp" style={styles.total}>
          [ {total.hours} hours {total.minutes} mins ]
        </Text>
      ) : null}
    </View>
  );
};

export default ActivityTotal;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "center",
  },
  color: {
    width: 20,
    height: 20,
  },
  title: {
    textTransform: "capitalize",
    width: 74,
    marginHorizontal: 10,
    color: colors.textPrimary,
  },
  total: {
    color: colors.headingPrimary,
  },
});
