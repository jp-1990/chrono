import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Header from "../components/common/Header/Header";
import Title from "../components/common/Title/Title";
import DataChart from "../components/common/DataChart/DataChart";
import Subtitle from "../components/common/Subtitle/Subtitle";
import TopActivities from "../components/Dashboard/TopActivities/TopActivities";
import TotalTime from "../components/Dashboard/TotalTime/TotalTime";
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

const Dashboard = () => {
  return (
    <View style={screen}>
      <Header statusbar="light" />
      <ScrollView style={styles.scrollZindex} fadingEdgeLength={50}>
        <View style={({ ...contentWrapper }, styles.containerPadding)}>
          <View style={styles.titleBox}>
            <Title text="last 7 days" />
          </View>
          <DataChart data={testData} start={27} num={7} />
          <View style={styles.subtitleBox}>
            <Subtitle text="top activities" />
          </View>
          <View>
            <TopActivities
              activities={[
                {
                  color: "blue",
                  title: "Sleep",
                  total: 56,
                },
                { color: "green", title: "work", total: 38 },
                { color: "red", title: "coding", total: 20 },
              ]}
            />
          </View>
          <View>
            <TotalTime total={114} />
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

export default Dashboard;

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 30,
    paddingBottom: 45,
    paddingTop: 29,
  },
  scrollZindex: { position: "relative", zIndex: -100 },
  titleBox: {
    width: "100%",
    alignItems: "flex-end",
  },
  subtitleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 12,
  },

  center: {
    alignItems: "center",
  },
});
