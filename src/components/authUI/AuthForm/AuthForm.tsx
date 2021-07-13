import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text } from "react-native";

import { FormInputs, MainButton } from "../../Common/index";

import { base } from "../../../styles";
const { colors } = base;

interface Props {
  inputLabels: string[];
  submitLabel: string;
  onSubmit(): void;
  values: { [key: string]: string };
  setValues: Dispatch<SetStateAction<{ [key: string]: string }>>;
  errorMessage?: string;
}

const AuthForm: React.FC<Props> = ({
  inputLabels,
  submitLabel,
  onSubmit,
  values,
  setValues,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <FormInputs
        inputLabels={inputLabels}
        setValues={setValues}
        values={values}
      />
      <Text style={styles.errorText}>{errorMessage && errorMessage}</Text>
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
  errorText: {
    color: colors.textPrimary,
  },
});
