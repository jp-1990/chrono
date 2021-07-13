import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { base } from "../../../styles";

const { border } = base;

interface Props {
  onPress(): void;
  label: string;
  width?: number | string;
  ripple?: string;
  colorBG?: string;
  colorText?: string;
  marginTop?: number;
}

const MainButton: React.FC<Props> = ({
  width,
  colorBG,
  colorText,
  label,
  ripple,
  onPress,
  marginTop,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colorBG || undefined,
          width: width || undefined,
          marginTop: marginTop || 36,
        },
      ]}
      android_ripple={{
        color: ripple || undefined,
        borderless: false,
        radius: 150,
      }}
      onPress={onPress ? () => onPress() : null}
    >
      <Text
        style={{
          color: colorText || undefined,
          fontFamily: "lato-regular",
          fontSize: 18,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    borderRadius: border.borderRadius,
  },
});
