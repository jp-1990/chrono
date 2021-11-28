import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../styles";

interface Props {
  onPress: () => void;
}

const FAB: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="add" size={32} color="white" />
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.buttonPrimary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#111",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});
