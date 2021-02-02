import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";

import base from "../styles/base";

import Header from "../components/common/Header/Header";
import TextButton from "../components/common/TextButton/TextButton";
import AppTitle from "../components/authUI/AppTitle/AppTitle";
import AuthForm from "../components/authUI/AuthForm/AuthForm";

const { colors } = base;

const SignUp = ({ navigation }) => {
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
              inputLabels={[
                "Username",
                "Email",
                "Password",
                "Confirm Password",
              ]}
              submitLabel={"Sign up"}
              onSubmit={null}
            />
            <TextButton
              onPress={() => navigation.navigate("Login")}
              label="Return to log in"
              color={colors.textSecondary}
              ripple={colors.buttonTextRipple}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 32,
  },
  inputBox: { alignItems: "center", width: "100%" },
});
