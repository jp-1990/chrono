import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Header from "../components/common/Header/Header";
import Title from "../components/common/Title/Title";
import SelectedMonth from "../components/common/SelectedMonth/SelectedMonth";
import BarChart from "../components/Reports/BarChart/BarChart";
import PieChart from "../components/Reports/PieChart/PieChart";
import TotalTimeSummary from "../components/Reports/TotalTimeSummary/TotalTimeSummary";
import Subtitle from "../components/common/Subtitle/Subtitle";
import ActivitiesKey from "../components/common/ActivitiesKey/ActivitiesKey";
import AveragesKey from "../components/Reports/AveragesKey/AveragesKey";
import Comparison from "../components/Reports/Comparison/Comparison";
import BottomNav from "../components/common/BottomNav/BottomNav";

import VictoryPieChart from "../components/Reports/VictoryPieChart/VictoryPieChart";

import base from "../styles/base";

const { colors } = base;
const { screen } = base;
const { contentWrapper } = base;

// test data
const activities = [
  {
    color: "blue",
    title: "Sleep",
    total: 30,
  },
  { color: "green", title: "work", total: 38 },
  { color: "gold", title: "coding", total: 20 },
  {
    color: "darkmagenta",
    title: "Sleep",
    total: 56,
  },
  { color: "deepskyblue", title: "work", total: 38 },
  { color: "rgb(255,0,0)", title: "coding", total: 10 },
  { color: "deeppink", title: "coding", total: 6 },
];

const testinfo = [
  [
    { color: "blue", height: "14%" },
    { color: "deeppink", height: "35%" },
    { color: "deepskyblue", height: "10%" },
  ],
  [
    { color: "blue", height: "12%" },
    { color: "green", height: "35%" },
    { color: "blue", height: "13%" },
  ],
  [
    { color: "blue", height: "14%" },
    { color: "green", height: "35%" },
    { color: "gold", height: "25%" },
    { color: "darkmagenta", height: "10%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "28%" },
    { color: "deepskyblue", height: "10%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "20%" },
    { color: "red", height: "28%" },
    { color: "blue", height: "2%" },
  ],
  [
    { color: "darkmagenta", height: "12%" },
    { color: "green", height: "35%" },
    { color: "blue", height: "13%" },
  ],
  [
    { color: "blue", height: "35%" },
    { color: "red", height: "20%" },
    { color: "gold", height: "28%" },
    { color: "deeppink", height: "2%" },
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
      <ScrollView style={styles.scrollZindex} fadingEdgeLength={50}>
        <View style={({ ...contentWrapper }, styles.containerPadding)}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleInnerWrapper}>
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
          <View style={styles.totalTimeSummaryContainer}>
            <TotalTimeSummary title="Total recorded time" time={160} />
            <TotalTimeSummary title="Total available time" time={210} />
          </View>
          <View style={styles.pieSubtitleBox}>
            <Subtitle text="activities" />
          </View>
          <View style={styles.pieChartContainer}>
            <VictoryPieChart activities={activities} />
          </View>
          <View style={styles.averagesContainer}>
            <AveragesKey activities={activities} />
          </View>
          <View style={styles.comparisonContainer}>
            <Comparison activities={activities} />
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
  titleInnerWrapper: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  titleContainer: {
    marginBottom: 8,
    marginRight: 10,
  },
  subtitleBox: {
    width: "100%",
    marginBottom: 15,
  },
  totalTimeSummaryContainer: {
    marginVertical: 14,
  },
  pieSubtitleBox: {
    width: "100%",
    marginTop: 26,
    alignItems: "center",
  },
  pieChartContainer: {
    marginTop: 0,
  },
  averagesContainer: {
    marginTop: 0,
  },
  comparisonContainer: {
    marginTop: 26,
  },
  center: {
    alignItems: "center",
  },
});
