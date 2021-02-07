import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Header from "../components/common/Header/Header";
import Title from "../components/common/Title/Title";
import DataChart from "../components/Dashboard/DataChart/DataChart";
import Subtitle from "../components/common/Subtitle/Subtitle";
import DateRange from "../components/Dashboard/DateRange/DateRange";
import TopActivities from "../components/Dashboard/TopActivities/TopActivities";
import TotalTime from "../components/Dashboard/TotalTime/TotalTime";
import MainButton from "../components/common/MainButton/MainButton";
import BottomNav from "../components/common/BottomNav/BottomNav";

import base from "../styles/base";

const { colors } = base;
const { screen } = base;
const { contentWrapper } = base;

const Dashboard = () => {
  return (
    <View style={screen}>
      <Header statusbar="light" />
      <ScrollView style={styles.scrollZindex}>
        <View style={({ ...contentWrapper }, styles.containerPadding)}>
          <View style={styles.titleBox}>
            <Title text="last 7 days" />
          </View>
          <DataChart />
          <View style={styles.subtitleBox}>
            <View style={styles.subtitlePadding}>
              <Subtitle text="top activities" />
            </View>
            <DateRange
              start={{ month: "january", date: "27th" }}
              end={{ month: "february", date: "2nd" }}
            />
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
  },
  subtitlePadding: {
    paddingTop: 5,
  },
  center: {
    alignItems: "center",
  },
});
