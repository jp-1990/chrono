import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";

import base from "../styles/base";

import Header from "../components/common/Header/Header";
import TextButton from "../components/common/TextButton/TextButton";

import AppTitle from "../components/authUI/AppTitle/AppTitle";
import AuthForm from "../components/authUI/AuthForm/AuthForm";
import SignupButton from "../components/authUI/SignupButton/SignupButton";

const { colors } = base;

const Login = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header statusbar="light" />
      <ScrollView>
        <View style={styles.contentWrapper}>
          <AppTitle
            title1="chrono"
            title2="focus"
            subtitle="Optimise your time"
          />
          <View style={styles.inputBox}>
            <AuthForm
              inputLabels={["Email", "Password"]}
              submitLabel={"Log in"}
              onSubmit={() => navigation.navigate("Dashboard")}
            />
            <TextButton
              onPress={() => navigation.navigate("Forgotten Password")}
              label="Forgotten password?"
              color={colors.textSecondary}
              ripple={colors.buttonTextRipple}
            />
          </View>
          <SignupButton
            onPress={() => navigation.navigate("Sign Up")}
            labelColor={colors.textPrimary}
            buttonColor={colors.buttonSecondary}
            ripple={colors.buttonSecondaryRipple}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputBox: { alignItems: "center", width: "100%" },
});
