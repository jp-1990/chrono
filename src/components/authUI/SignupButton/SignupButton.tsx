import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

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
      <Text style={{ ...styles.signupText, color: labelColor || "#454851" }}>
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
  signupText: {
    fontSize: 16,
  },
  signupPressBox: {
    marginVertical: 4,
  },
  signupPress: {
    fontSize: 16,
    fontFamily: "lato-bold",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
});
