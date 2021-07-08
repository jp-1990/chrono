import React from "react";

import { StoreProvider } from "easy-peasy";
import { store } from "./src/global-store";

import { AppRegistry } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import Login from "./src/Screens/Login";
import ForgottenPassword from "./src/Screens/ForgottenPassword";
import SignUp from "./src/Screens/SignUp";
import Dashboard from "./src/Screens/Dashboard";
import Timeline from "./src/Screens/Timeline";
import Reports from "./src/Screens/Reports";

type RouteParams = {
  id: string;
};
export type StackParams = {
  Login?: RouteParams;
  "Forgotten Password"?: RouteParams;
  "Sign Up"?: RouteParams;
  Dashboard?: RouteParams;
  Timeline?: RouteParams;
  Reports?: RouteParams;
};

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://192.168.0.17:4000/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjI1YTE3YjgxZmFkOTQ0MzA4MjBmMzgiLCJpYXQiOjE2MjUxNjI3OTEsImV4cCI6MTYzMjkzODc5MX0.vpKgq_awHYI1k0uQvdVNZO-1Cqc07f3lm2XTXT1T7ao",
  },
});
AppRegistry.registerComponent("MyApplication", () => App);

const Stack = createStackNavigator<StackParams>();

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
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
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
              <Stack.Screen name="Reports" component={Reports} />
            </Stack.Navigator>
          </NavigationContainer>
        </StoreProvider>
      </ApolloProvider>
    );
  }
}
