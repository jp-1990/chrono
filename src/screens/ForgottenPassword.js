import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import base from "../styles/base";

import AuthHeader from "../components/authUI/AuthHeader/AuthHeader";
import TextButton from "../components/common/TextButton/TextButton";
import AppTitle from "../components/authUI/AppTitle/AppTitle";
import AuthForm from "../components/authUI/AuthForm/AuthForm";
import SignupButton from "../components/authUI/SignupButton/SignupButton";

const { colors } = base;

const ForgottenPassword = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <AuthHeader statusbar="light" />
      <ScrollView>
        <View style={styles.contentWrapper}>
          <AppTitle
            title1="chrono"
            title2="focus"
            subtitle="Optimise your time"
          />
          <View style={styles.inputBox}>
            <AuthForm
              inputLabels={["Email"]}
              submitLabel={"Send reset email"}
              onSubmit={null}
            />
            <TextButton
              onPress={() => navigation.navigate("Login")}
              label="Return to log in"
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

export default ForgottenPassword;

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
