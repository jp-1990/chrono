import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import base from "../styles/base";

import AuthHeader from "../Components/AuthUI/AuthHeader/AuthHeader";
import TextButton from "../Components/Common/TextButton/TextButton";
import AppTitle from "../Components/AuthUI/AppTitle/AppTitle";
import AuthForm from "../Components/AuthUI/AuthForm/AuthForm";

const { colors } = base;

const SignUp = ({ navigation }) => {
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
