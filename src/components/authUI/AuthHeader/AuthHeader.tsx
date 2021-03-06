import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import base from "../../../styles/base";

const { colors } = base;

interface Props {
  statusBar: "auto" | "inverted" | "light" | "dark" | undefined;
}

const AuthHeader: React.FC<Props> = ({ statusBar }) => {
  return (
    <>
      <ExpoStatusBar style={statusBar} />
      <View style={styles.statusBar}></View>
      <View style={styles.header}></View>
    </>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: colors.menuSecondary,
  },
  header: {
    backgroundColor: colors.menuPrimary,
    height: 50,
  },
});
