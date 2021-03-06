import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Subtitle from "../../Common/Subtitle/Subtitle";
import ActivityTotal from "../../Common/ActivityTotal/ActivityTotal";

import base from "../../../styles/base";
const { colors } = base;

const AveragesKey = ({ activities }) => {
  // activities contains array of items with color, title and total

  // activity items to render
  const renderedItems = [];
  for (let i = 0, j = activities.length; i < j; i++) {
    renderedItems.push(
      <View key={i} style={styles.row}>
        <ActivityTotal
          color={activities[i].color}
          title={activities[i].title}
          total={activities[i].total}
          totalVisible={true}
        />
        <View>
          <Text
            style={styles.averageText}
          >{`${activities[i].total} hours`}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titles}>
        <Subtitle text="key" />
        <View style={styles.averageTitleContainer}>
          <Text style={styles.averageTitle}>Average</Text>
          <Text style={styles.averageTitle}>p/week</Text>
        </View>
      </View>
      {renderedItems}
    </View>
  );
};

export default AveragesKey;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  averageTitle: {
    fontSize: 15,
    fontFamily: "lato-light",
    color: colors.headingPrimary,
  },
  averageText: { color: colors.headingSecondary },
});
