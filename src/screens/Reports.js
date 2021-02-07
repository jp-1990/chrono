import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Header from "../components/common/Header/Header";
import Title from "../components/common/Title/Title";
import SelectedMonth from "../components/common/SelectedMonth/SelectedMonth";
import BarChart from "../components/Reports/BarChart/BarChart";
import Subtitle from "../components/common/Subtitle/Subtitle";
import ActivitiesKey from "../components/common/ActivitiesKey/ActivitiesKey";
import BottomNav from "../components/common/BottomNav/BottomNav";

import base from "../styles/base";

const { colors } = base;
const { screen } = base;
const { contentWrapper } = base;

// test data
const activities = [
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
];

const testinfo = [
  [
    { color: "blue", height: "14%" },
    { color: "green", height: "35%" },
    { color: "blue", height: "10%" },
  ],
  [
    { color: "blue", height: "12%" },
    { color: "green", height: "35%" },
    { color: "blue", height: "13%" },
  ],
  [
    { color: "blue", height: "14%" },
    { color: "green", height: "35%" },
    { color: "red", height: "25%" },
    { color: "blue", height: "10%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "28%" },
    { color: "blue", height: "10%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "20%" },
    { color: "red", height: "28%" },
    { color: "blue", height: "2%" },
  ],
  [
    { color: "blue", height: "12%" },
    { color: "green", height: "35%" },
    { color: "blue", height: "13%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "20%" },
    { color: "red", height: "28%" },
    { color: "blue", height: "2%" },
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
        <View style={({ ...contentWrapper }, styles.containerPadding)}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleBox}>
              <View style={styles.titleContainer}>
                <Title text="reports" />
              </View>
              <View style={styles.monthContainer}>
                <SelectedMonth month="january" year={2021} />
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <BarChart data={testData} />
          </View>
          <View style={styles.subtitleBox}>
            <Subtitle text="key" />
          </View>
          <View>
            <ActivitiesKey activities={activities} />
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
    paddingTop: 29,
  },
  scrollZindex: { position: "relative", zIndex: -100 },
  titleWrapper: {
    width: "100%",
    alignItems: "flex-end",
  },
  titleBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  titleContainer: {
    marginBottom: 4,
  },
  subtitleBox: {
    width: "100%",
    marginBottom: 15,
  },

  center: {
    alignItems: "center",
  },
});
