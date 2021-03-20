import React from "react";
import { View } from "react-native";

import { BarChartTypes } from "../../../../types";

const ChartBar: React.FC<BarChartTypes["chartBar"]> = ({ color, height }) => {
  return (
    <View
      style={{ backgroundColor: color, height: height, width: "100%" }}
    ></View>
  );
};

export default ChartBar;
