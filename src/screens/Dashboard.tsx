import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Modal } from "react-native";

import {
  Header,
  Title,
  DataChart,
  Subtitle,
  MainButton,
  BottomNav,
  NewActivity,
} from "../Components/Common";
import { TopActivities, TotalTime } from "../Components/Dashboard";
import { useDashboard } from "../hooks";
import { hoursToHoursAndMinutes } from "../utils";

import { base } from "../styles";
const { colors, screen } = base;

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const { tasks, startDate, endDate } = useDashboard();
  // get top 3 activities
  const topActivities = tasks.summary?.slice(0, 3);
  // get total as hours and mins
  const total = hoursToHoursAndMinutes(tasks?.totalTime);
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
        <View style={styles.containerPadding}>
          <View style={styles.titleBox}>
            <Title text="last 7 days" />
          </View>
          <DataChart data={tasks.data} start={startDate} end={endDate} />
          <View style={styles.subtitleBox}>
            <Subtitle text="top categories" />
          </View>
          <View>
            <TopActivities activities={topActivities} />
          </View>
          <View>
            <TotalTime total={total} />
          </View>
          <View style={styles.center}>
            <MainButton
              label="New Activity"
              width="55%"
              colorBG={colors.buttonPrimary}
              colorText={colors.buttonText}
              ripple={colors.buttonPrimaryRipple}
              onPress={() => setModalVisible(true)}
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
