import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import base from "../../../styles/base";

const { colors } = base;

const Header = ({ statusbar }) => {
  return (
    <>
      <ExpoStatusBar style={statusbar} />
      <View style={styles.statusbar}></View>
      <View style={styles.header}></View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  statusbar: {
    height: StatusBar.currentHeight,
    backgroundColor: colors.menuSecondary,
  },
  header: {
    backgroundColor: colors.menuPrimary,
    height: 50,
  },
});
