import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../App";

import TextButton from "../Components/Common/TextButton/TextButton";
import { AuthHeader, AppTitle, AuthForm } from "../Components/AuthUI";

import { base } from "../styles";
const { colors } = base;

type ForgottenPasswordNavigationProp = StackNavigationProp<
  StackParams,
  "SignUp"
>;

interface Props {
  navigation: ForgottenPasswordNavigationProp;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <AuthHeader statusBar="light" />
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
              onSubmit={() => {}}
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
