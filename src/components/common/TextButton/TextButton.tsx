import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  color?: string;
  label: string;
  ripple?: string;
  onPress(): void;
}

const TextButton: React.FC<Props> = ({ color, label, ripple, onPress }) => {
  return (
    <Pressable
      style={{
        marginVertical: 9,
        paddingVertical: 3,
        paddingHorizontal: 12,
      }}
      android_ripple={{
        color: ripple,
        borderless: false,
        radius: 150,
      }}
      onPress={() => onPress()}
    >
      <Text
        style={{
          color: color,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TextButton;
