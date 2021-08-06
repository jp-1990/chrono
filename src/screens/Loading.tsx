import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { AppTitle } from "../Components/AuthUI";
import { Header } from "../Components/Common";

import { base } from "../styles";
const { screen, contentWrapper } = base;

const Loading = () => {
  return (
    <View style={styles.screen}>
      <Header statusBar="light" />
      <ScrollView>
        <View style={styles.contentWrapper}>
          <AppTitle
            title1="chrono"
            title2="focus"
            subtitle="Optimise your time"
          />
        </View>
        <Text>LOADING AUTH</Text>
      </ScrollView>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  screen: screen,
  contentWrapper: contentWrapper,
  inputContainer: { alignItems: "center", width: "100%" },
});
