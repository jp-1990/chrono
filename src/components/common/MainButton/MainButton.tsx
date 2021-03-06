import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  onPress(): void;
  label: string;
  width: number | string;
  ripple: string;
  colorBG: string;
  colorText: string;
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
      style={{
        backgroundColor: colorBG,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        height: 42,
        marginTop: marginTop || 36,
      }}
      android_ripple={{
        color: ripple,
        borderless: false,
        radius: 150,
      }}
      onPress={onPress ? () => onPress() : null}
    >
      <Text
        style={{
          color: colorText,
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
