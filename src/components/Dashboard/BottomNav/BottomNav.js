import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import base from "../../../styles/base";
const { colors } = base;

const BottomNav = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="view-dashboard" size={35} color="white" />
      </View>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="chart-timeline" size={35} color="white" />
      </View>
      <View style={styles.iconBox}>
        <MaterialIcons name="analytics" size={35} color="white" />
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.menuSecondary,
    flexDirection: "row",
    height: 56,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  iconBox: {
    backgroundColor: colors.menuPrimary,
    height: 44,
    width: "31.5%",
    alignItems: "center",
    justifyContent: "center",
  },
});
