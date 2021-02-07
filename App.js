import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import Login from "./src/screens/Login";
import ForgottenPassword from "./src/screens/ForgottenPassword";
import SignUp from "./src/screens/SignUp";
import Dashboard from "./src/screens/Dashboard";
import Timeline from "./src/screens/Timeline";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "lato-thin": require("./assets/fonts/Lato-Thin.ttf"),
    "lato-light": require("./assets/fonts/Lato-Light.ttf"),
    "lato-regular": require("./assets/fonts/Lato-Regular.ttf"),
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    "lato-black": require("./assets/fonts/Lato-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Forgotten Password"
            component={ForgottenPassword}
          />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Timeline" component={Timeline} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
