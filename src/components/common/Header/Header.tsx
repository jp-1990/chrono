import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import { colors } from "../../../styles";

interface Props {
  statusBar: "auto" | "inverted" | "light" | "dark" | undefined;
}

const Header: React.FC<Props> = ({ statusBar }) => {
  return (
    <>
      <ExpoStatusBar style={Platform.OS === "android" ? statusBar : "light"} />
      <View style={styles.statusBar}></View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.menuSecondary,
  },
});
