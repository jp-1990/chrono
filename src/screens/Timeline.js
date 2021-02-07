import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../components/common/Header/Header";
import Title from "../components/common/Title/Title";
import DataChart from "../components/common/DataChart/DataChart";
import Subtitle from "../components/common/Subtitle/Subtitle";
import SelectedMonth from "../components/Timeline/SelectedMonth/SelectedMonth";
import ActivitiesKey from "../components/Timeline/ActivitiesKey/ActivitiesKey";
import MainButton from "../components/common/MainButton/MainButton";
import BottomNav from "../components/common/BottomNav/BottomNav";

import base from "../styles/base";

const { colors } = base;
const { screen } = base;
const { contentWrapper } = base;

// test data
const testinfo = [
  [
    { color: "blue", width: "14%", margin: null },
    { color: "green", width: "35%", margin: "8%" },
    { color: "blue", width: "10%", margin: "33%" },
  ],
  [
    { color: "blue", width: "12%", margin: null },
    { color: "green", width: "35%", margin: "10%" },
    { color: "blue", width: "13%", margin: "30%" },
  ],
  [
    { color: "blue", width: "14%", margin: null },
    { color: "green", width: "35%", margin: "8%" },
    { color: "red", width: "25%", margin: "6%" },
    { color: "blue", width: "10%", margin: "2%" },
  ],
  [
    { color: "blue", width: "35%", margin: null },
    { color: "red", width: "28%", margin: "7%" },
    { color: "blue", width: "10%", margin: "20%" },
  ],
  [
    { color: "blue", width: "35%", margin: null },
    { color: "red", width: "20%", margin: "10%" },
    { color: "red", width: "28%", margin: "2%" },
    { color: "blue", width: "2%", margin: "3%" },
  ],
  [
    { color: "blue", width: "12%", margin: null },
    { color: "green", width: "35%", margin: "10%" },
    { color: "blue", width: "13%", margin: "30%" },
  ],
  [
    { color: "blue", width: "35%", margin: null },
    { color: "red", width: "20%", margin: "10%" },
    { color: "red", width: "28%", margin: "2%" },
    { color: "blue", width: "2%", margin: "3%" },
  ],
];

const testData = [];
let j = 0;
for (let i = 1; i <= 31; i++) {
  if (j === testinfo.length) j = 0;
  testData.push({ [i]: testinfo[j] });
  j++;
}

const Timeline = () => {
  return (
    <View style={screen}>
      <Header statusbar="light" />
      <ScrollView style={styles.scrollZindex}>
        <View style={{ ...contentWrapper, ...styles.titleBox }}>
          <View style={styles.monthContainer}>
            <View>
              <MaterialIcons
                name="arrow-left"
                size={24}
                color={colors.headingSecondary}
              />
              <MaterialIcons
                name="arrow-left"
                size={24}
                color={colors.headingSecondary}
              />
            </View>
            <SelectedMonth month="january" year={2021} />
            <View>
              <MaterialIcons
                name="arrow-right"
                size={24}
                color={colors.headingSecondary}
              />
              <MaterialIcons
                name="arrow-right"
                size={24}
                color={colors.headingSecondary}
              />
            </View>
          </View>
          <View style={styles.titleMargin}>
            <Title text="timeline" />
          </View>
        </View>
        <View style={({ ...contentWrapper }, styles.containerPadding)}>
          <View style={styles.chartContainer}>
            <DataChart data={testData} start={null} num={null} />
          </View>
          <View style={styles.subtitleBox}>
            <Subtitle text="key" />
          </View>
          <View>
            <ActivitiesKey
              activities={[
                {
                  color: "blue",
                  title: "Sleep",
                  total: 56,
                },
                { color: "green", title: "work", total: 38 },
                { color: "gold", title: "coding", total: 20 },
                {
                  color: "darkmagenta",
                  title: "Sleep",
                  total: 56,
                },
                { color: "deepskyblue", title: "work", total: 38 },
                { color: "red", title: "coding", total: 20 },
                { color: "deeppink", title: "coding", total: 20 },
              ]}
            />
          </View>
          <View style={styles.center}>
            <MainButton
              label="New Activity"
              width="55%"
              colorBG={colors.buttonPrimary}
              colorText={colors.buttonText}
              ripple={colors.buttonPrimaryRipple}
              onPress={null}
            />
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 30,
    paddingBottom: 45,
  },
  scrollZindex: { position: "relative", zIndex: -100 },
  titleBox: {
    paddingTop: 29,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    marginTop: 5,
    marginBottom: 10,
  },
  titleMargin: {
    marginHorizontal: 30,
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleBox: {
    width: "100%",
    marginBottom: 20,
  },

  center: {
    alignItems: "center",
  },
});
