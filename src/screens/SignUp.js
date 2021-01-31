import React from "react";
import { View, TextInput, StyleSheet, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import base from "../styles/base";

import Header from "../components/common/Header/Header";
import MainButton from "../components/common/MainButton/MainButton";
import TextButton from "../components/common/TextButton/TextButton";
import AppTitle from "../components/authUI/AppTitle/AppTitle";

const { colors } = base;
const { mainInput } = base;

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header statusbar="light" />
      <View style={styles.contentWrapper}>
        <AppTitle
          title1="chrono"
          title2="focus"
          subtitle="Optimise your time"
        />
        <View style={styles.inputBox}>
          <TextInput placeholder="Username" style={mainInput}></TextInput>
          <TextInput placeholder="Email" style={mainInput}></TextInput>
          <TextInput placeholder="Password" style={mainInput}></TextInput>
          <TextInput
            placeholder="Confirm Password"
            style={mainInput}
          ></TextInput>
          <MainButton
            label="Log in"
            width="50%"
            colorBG={colors.buttonPrimary}
            colorText={colors.buttonText}
            ripple={colors.buttonPrimaryRipple}
          />
          <TextButton
            onPress={() => navigation.navigate("Login")}
            label="Return to log in"
            color={colors.textSecondary}
            ripple={colors.buttonTextRipple}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputBox: { alignItems: "center", width: "100%" },
});
