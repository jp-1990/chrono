import React from "react";
import { View, StyleSheet } from "react-native";

import { DataTypes } from "../../../../types/data";

interface Props {
  data: DataTypes;
}

// renders an individual bar within the the data chart
const DataBar: React.FC<Props> = ({ data }) => {
  return (
    <View
      style={{
        ...styles.dataBar,
        backgroundColor: data.color,
        width: data.width,
        marginLeft: data.margin ? data.margin : 0,
      }}
    ></View>
  );
};

export default DataBar;

const styles = StyleSheet.create({
  dataBar: {
    height: 22,
  },
});
