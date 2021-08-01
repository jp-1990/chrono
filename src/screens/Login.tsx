import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParams } from "../Navigation";
import { useLazyQuery } from "@apollo/client";

import { LoginQuery, LoginQueryArgs, LoginQueryRes } from "../graphql/queries";
import { AppTitle, AuthForm, SignUpButton } from "../Components/AuthUI";
import { TextButton, Header } from "../Components/Common";

import { useStoreActions, useStoreState } from "../global-store";

import { base, colors } from "../styles";
const { screen, contentWrapper } = base;

type ForgottenPasswordNavigationProp = StackNavigationProp<
  StackParams,
  "Login"
>;

interface Props {
  navigation: ForgottenPasswordNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { setAuth } = useStoreActions((actions) => actions);

  const [requestLogin, { data, loading }] = useLazyQuery<
    LoginQueryRes,
    LoginQueryArgs
  >(LoginQuery, {
    onError: (err) => {
      setErrorMessage(err.message);
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
      <Header statusBar="light" />
      <ScrollView>
        <View style={styles.contentWrapper}>
          <AppTitle
            title1="chrono"
            title2="focus"
            subtitle="Optimise your time"
          />
          <View style={styles.inputContainer}>
            <AuthForm
              values={values}
              setValues={setValues}
              inputLabels={["Email", "Password"]}
              submitLabel={"Log in"}
              onSubmit={handleLogin}
              errorMessage={errorMessage}
            />
            <TextButton
              onPress={() => navigation.navigate("ForgottenPassword")}
              label="Forgotten password?"
              color={colors.textSecondary}
              ripple={colors.buttonTextRipple}
            />
          </View>
          <SignUpButton
            onPress={() => navigation.navigate("SignUp")}
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
  screen: screen,
  contentWrapper: contentWrapper,
  inputContainer: { alignItems: "center", width: "100%" },
});
