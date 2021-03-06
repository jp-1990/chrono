import React from "react";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import base from "../../../styles/base";

const { colors } = base;

const Header = ({ statusbar }) => {
  return (
    <>
      <ExpoStatusBar style={statusbar} />
      <View style={styles.statusbar}></View>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.imageBox}>
            <View style={styles.image}></View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  statusbar: {
    height: StatusBar.currentHeight,
    backgroundColor: colors.menuSecondary,
  },
  headerContainer: {
    backgroundColor: colors.backgroundColor,
    height: 56,
  },
  header: {
    backgroundColor: colors.menuPrimary,
    height: 56,
    position: "relative",
  },
  imageBox: {
    height: 85,
    width: 85,
    backgroundColor: colors.menuPrimary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  image: {
    height: 56,
    width: 56,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
