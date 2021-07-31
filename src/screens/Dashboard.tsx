import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Modal, Pressable } from "react-native";
import moment from "moment";

import {
  Header,
  Text,
  Title,
  DataChart,
  Subtitle,
  MainButton,
  BottomNav,
  NewActivity,
} from "../Components/Common";
import { TopActivities, TotalTime } from "../Components/Dashboard";
import { useDashboard } from "../hooks";
import { hoursToHoursAndMinutes, durationInHours } from "../utils";

import { base, colors, screenSize } from "../styles";
const { screen } = base;

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const { tasks, startDate, endDate } = useDashboard();
  // get top 3 activities
  const topActivities = tasks.summary?.slice(0, 3);
  // get total as hours and mins
  const recorded = hoursToHoursAndMinutes(tasks?.totalTime);
  const possible = durationInHours(moment(startDate), moment(endDate));
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ScrollView style={styles.scrollZindex}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setColorPickerVisible(false);
          }}
        >
          <NewActivity
            onSubmit={() => {}}
            close={() => {}}
            colorPicker={{
              setColorPickerVisible: () =>
                setColorPickerVisible((prev) => !prev),
              colorPickerVisible: colorPickerVisible,
            }}
          />
        </Modal>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title
              title="dashboard"
              subtitle={`${moment(startDate).format("MMM Do")} - ${moment(
                endDate
              )
                .subtract(1, "days")
                .format("MMM Do")}`}
            />
          </View>
          <View>
            <DataChart
              style={styles.dataChart}
              data={tasks.data}
              start={startDate}
              end={endDate}
            />
          </View>
          <TopActivities
            style={styles.topActivities}
            title="TOP ACTIVITIES"
            activities={topActivities}
          />

          <TotalTime
            style={styles.totalTime}
            recorded={recorded}
            possible={possible}
          />
        </View>
      </ScrollView>

      {/* <BottomNav /> */}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollZindex: { position: "relative", zIndex: -100 },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 6,
  },
  dataChart: {
    width: screenSize.width - 24,
    marginBottom: 19,
    marginTop: 12,
  },
  topActivities: {
    marginHorizontal: 24,
    marginBottom: 19,
  },
  totalTime: {
    marginHorizontal: 24,
  },
});
