import React, { Dispatch, SetStateAction } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import { base } from "../../../styles";
const { defaultInput } = base;

interface Props {
  inputLabels: string[];
  values: { [key: string]: string };
  setValues: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const FormInputs: React.FC<Props> = ({ inputLabels, values, setValues }) => {
  const inputFields = inputLabels.map((e, i) => {
    const handleChangeText = (text: string) => {
      setValues((prev) => {
        return {
          ...prev,
          [e]: text,
        };
      });
    };

    return (
      <TextInput
        secureTextEntry={e === "Password"}
        key={i}
        value={values[e]}
        onChangeText={handleChangeText}
        placeholder={e}
        style={defaultInput}
      ></TextInput>
    );
  });

  return <View style={styles.inputBox}>{inputFields}</View>;
};

export default FormInputs;

const styles = StyleSheet.create({
  inputBox: { alignItems: "center", width: "100%" },
});
