import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { colors } from "../../../styles";

const BottomNav = () => {
  // useNavigation hook works with react context in the background and provides the navigation object from the current screen
  const navigation = useNavigation();
  // useRoute provides route object from current screen
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: colors.buttonTextRipple,
          borderless: false,
          radius: 150,
        }}
        onPress={() => navigation.navigate("Dashboard")}
        style={{
          ...styles.iconBox,
          backgroundColor:
            route.name === "Dashboard" ? colors.buttonSecondary : undefined,
        }}
      >
        <View>
          <MaterialCommunityIcons
            name="view-dashboard"
            size={35}
            color="white"
          />
        </View>
      </Pressable>
      <Pressable
        android_ripple={{
          color: colors.buttonTextRipple,
          borderless: false,
          radius: 150,
        }}
        onPress={() => navigation.navigate("Timeline")}
        style={{
          ...styles.iconBox,
          backgroundColor:
            route.name === "Timeline" ? colors.buttonSecondary : undefined,
        }}
      >
        <View>
          <MaterialCommunityIcons
            name="chart-timeline"
            size={35}
            color="white"
          />
        </View>
      </Pressable>
      <Pressable
        android_ripple={{
          color: colors.buttonTextRipple,
          borderless: false,
          radius: 150,
        }}
        onPress={() => navigation.navigate("Reports")}
        style={{
          ...styles.iconBox,
          backgroundColor:
            route.name === "Reports" ? colors.buttonSecondary : undefined,
        }}
      >
        <View>
          <MaterialIcons name="analytics" size={35} color="white" />
        </View>
      </Pressable>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.menuSecondary,
    flexDirection: "row",
    height: 56,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  iconBox: {
    height: 44,
    width: "31.5%",
    alignItems: "center",
    justifyContent: "center",
  },
});
