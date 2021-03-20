import React from "react";
import { View, StyleSheet } from "react-native";

import { FormInputs, MainButton } from "../../Common/index";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  inputLabels: string[];
  submitLabel: string;
  onSubmit(): void;
}

const AuthForm: React.FC<Props> = ({ inputLabels, submitLabel, onSubmit }) => {
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
