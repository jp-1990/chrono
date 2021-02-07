import React from "react";
import { View } from "react-native";
const ChartBar = ({ color, height }) => {
  return (
    <View
      style={{ backgroundColor: color, height: height, width: "100%" }}
    ></View>
  );
};

export default ChartBar;
