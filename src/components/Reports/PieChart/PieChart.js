import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import Segment from "./Segment/Segment";

const PieChart = ({ activities }) => {
  // activities contains array of items with color, title and total
  // get total of totals
  let total = 0;
  for (let i = 0, j = activities.length; i < j; i++) {
    total += activities[i].total;
  }

  // sort items to make bigger segments display on the left
  activities.sort((a, b) => {
    return b.total - a.total;
  });

  //while (activities.length > 2) activities.pop();

  let renderItems = [];
  let percentageCounter = 0;

  for (let i = 0, j = activities.length; i < j; i++) {
    // calc percentage
    const percentage = (activities[i].total / 300) * 100;

    // add segment to array to be rendered
    renderItems.push(
      <Segment
        key={i}
        percentage={percentage}
        color={activities[i].color}
        rotation={360 * (percentageCounter / 100)}
      />
    );
    // add percentage to counter to determine rotation of next item
    percentageCounter += percentage;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pieChart}>{renderItems}</View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  pieChart: {
    backgroundColor: "#efefef",
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    overflow: "hidden",
  },
});
