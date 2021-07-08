import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../../App";
import { useLazyQuery } from "@apollo/client";

import { LoginQuery, LoginQueryArgs, LoginQueryRes } from "../graphql/queries";
import {
  AuthHeader,
  AppTitle,
  AuthForm,
  SignUpButton,
} from "../Components/AuthUI";
import TextButton from "../Components/Common/TextButton/TextButton";

import { useStoreActions, useStoreState } from "../global-store";

import { base } from "../styles";
const { colors } = base;

type ForgottenPasswordNavigationProp = StackNavigationProp<
  StackParams,
  "Login"
>;

interface Props {
  navigation: ForgottenPasswordNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const { setAuth } = useStoreActions((actions) => actions);
  const { auth } = useStoreState((state) => state);

  console.log("auth:", auth);

  const [requestLogin, { data, loading }] = useLazyQuery<
    LoginQueryRes,
    LoginQueryArgs
  >(LoginQuery, {
    onError: (err) => {
      console.log(err);
    },
    onCompleted: (res) => {
      console.log(res);
      setAuth({
        token: res.signIn.token,
        tokenExpires: res.signIn.tokenExpires,
      });
    },
  });

  const handleLogin = () => {
    requestLogin({
      variables: { email: values.Email || "", password: values.Password || "" },
    });
  };

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
              values={values}
              setValues={setValues}
              inputLabels={["Email", "Password"]}
              submitLabel={"Log in"}
              onSubmit={handleLogin}
            />
            <TextButton
              onPress={() => navigation.navigate("Forgotten Password")}
              label="Forgotten password?"
              color={colors.textSecondary}
              ripple={colors.buttonTextRipple}
            />
          </View>
          <SignUpButton
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
