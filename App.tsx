import React from "react";

import { StoreProvider } from "easy-peasy";
import { store } from "./src/global-store";

import { AppRegistry } from "react-native";
import { ApolloProvider } from "./src/Providers";

import { NavigationContainer } from "@react-navigation/native";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import { AppRouter } from "./src/Navigation";

AppRegistry.registerComponent("MyApplication", () => App);

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
      <StoreProvider store={store}>
        <ApolloProvider>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </ApolloProvider>
      </StoreProvider>
    );
  }
}
