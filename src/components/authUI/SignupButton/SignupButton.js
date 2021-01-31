import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const SignupButton = ({ labelColor, buttonColor, ripple, onPress }) => {
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
  signupBox: { justifyContent: "center", alignItems: "center", marginTop: 72 },
  signupText: {
    fontSize: 18,
  },
  signupPressBox: {
    marginVertical: 6,
  },
  signupPress: {
    fontSize: 18,
    fontFamily: "lato-bold",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
});
