import React from "react";
import { View, StyleSheet } from "react-native";

const DataBar = ({ color, data }) => {
  return (
    <View
      style={{
        ...styles.dataBar,
        backgroundColor: color,
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
