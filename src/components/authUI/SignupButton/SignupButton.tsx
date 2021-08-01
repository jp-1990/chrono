import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import { Text } from "../../Common";

interface Props {
  labelColor?: string;
  buttonColor?: string;
  ripple?: string;
  onPress(): void;
}

const SignupButton: React.FC<Props> = ({
  labelColor,
  buttonColor,
  ripple,
  onPress,
}) => {
  return (
    <View style={styles.signupBox}>
      <Text variant="h4" style={{ color: labelColor || "#454851" }}>
        Don't have an account?
      </Text>
      <Pressable
        android_ripple={{
          color: ripple || "#B5D2FD",
          borderless: false,
          radius: 150,
        }}
        style={styles.signupPressBox}
        onPress={() => onPress()}
      >
        <Text
          variant="h4"
          style={{ ...styles.signupPress, color: buttonColor || "#5484CB" }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignupButton;

const styles = StyleSheet.create({
  signupBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 18,
  },
  signupPressBox: {
    marginVertical: 4,
  },
  signupPress: {
    fontFamily: "lato-bold",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
});
