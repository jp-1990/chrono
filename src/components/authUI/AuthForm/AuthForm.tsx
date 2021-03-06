import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import FormInputs from "../../common/FormInputs/FormInputs";
import MainButton from "../../common/MainButton/MainButton";

import base from "../../../styles/base";
const { colors } = base;

const AuthForm = ({ inputLabels, submitLabel, onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormInputs inputLabels={inputLabels} />
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
  container: { alignItems: "center", width: "100%" },
});
