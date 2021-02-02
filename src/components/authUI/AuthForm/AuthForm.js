import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import MainButton from "../../common/MainButton/MainButton";

import base from "../../../styles/base";
const { authInput } = base;
const { colors } = base;

const AuthForm = ({ inputLabels, submitLabel, onSubmit }) => {
  const inputFields = inputLabels.map((e, i) => {
    return <TextInput key={i} placeholder={e} style={authInput}></TextInput>;
  });

  return (
    <View style={styles.inputBox}>
      {inputFields}
      <MainButton
        label={submitLabel}
        width="50%"
        colorBG={colors.buttonPrimary}
        colorText={colors.buttonText}
        ripple={colors.buttonPrimaryRipple}
        onPress={onSubmit}
      />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  inputBox: { alignItems: "center", width: "100%" },
});
