import React from "react";
import { View, StyleSheet } from "react-native";

import { TaskDataWithMarginAndWidth } from "../../../../types/data";

interface Props {
  data: TaskDataWithMarginAndWidth | undefined;
}

// renders an individual bar within the the data chart
const DataBar: React.FC<Props> = ({ data }) => {
  return (
    <View
      style={{
        ...styles.dataBar,
        backgroundColor: data?.color,
        width: data?.width,
        marginLeft: data?.marginLeft ? data.marginLeft : 0,
      }}
    ></View>
  );
};

export default DataBar;

const styles = StyleSheet.create({
  dataBar: {
    height: 22,
    borderRadius: 2,
  },
});
