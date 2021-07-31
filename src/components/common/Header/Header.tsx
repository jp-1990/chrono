import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { colors } from "../../../styles";

interface Props {
  statusBar: "auto" | "inverted" | "light" | "dark" | undefined;
}

const Header: React.FC<Props> = ({ statusBar }) => {
  return (
    <>
      <ExpoStatusBar style={statusBar} />
      <View style={styles.statusBar}></View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: colors.menuSecondary,
  },
});
