import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import base from "../../../styles/base";
const { defaultInput } = base;

const FormInputs = ({ inputLabels }) => {
  const inputFields = inputLabels.map((e, i) => {
    return <TextInput key={i} placeholder={e} style={defaultInput}></TextInput>;
  });

  return <View style={styles.inputBox}>{inputFields}</View>;
};

export default FormInputs;

const styles = StyleSheet.create({
  inputBox: { alignItems: "center", width: "100%" },
});
