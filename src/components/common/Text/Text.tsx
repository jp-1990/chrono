import React from "react";
import { Text as NativeText, TextStyle, TextProps } from "react-native";
import { text } from "../../../styles";

interface Props extends TextProps {
  variant: "h1" | "h2" | "h3" | "h4" | "main" | "sp" | "ssp";
  style?: TextStyle;
  children: React.ReactNode;
}

const Text: React.FC<Props> = ({ variant, children, style, ...props }) => {
  return (
    <NativeText style={[text[variant || "main"], style]} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
