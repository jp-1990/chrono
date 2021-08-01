import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";

import { FormInputs, MainButton, Text } from "../../Common";

import { colors } from "../../../styles";

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
      <Text variant="main" style={styles.errorText}>
        {errorMessage && errorMessage}
      </Text>
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
