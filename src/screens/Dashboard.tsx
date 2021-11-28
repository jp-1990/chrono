import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import moment from "moment";

import {
  Header,
  Title,
  DataChart,
  NewActivity,
  BottomNav,
} from "../Components/Common";
import { TopActivities, TotalTime } from "../Components/Dashboard";
import { Modal } from "../Components/Layouts";
import { useDashboard } from "../hooks";
import { hoursToHoursAndMinutes, durationInHours } from "../utils";

import { base, screenSize } from "../styles";
const { screen } = base;

const Dashboard = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalContentSize, setModalContentSize] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });

  const { tasks, startDate, endDate } = useDashboard();

  // get top 3 activities
  const topActivities = tasks.summary?.slice(0, 3);
  // get total as hours and mins
  const recorded = hoursToHoursAndMinutes(tasks?.totalTime);
  const possible = durationInHours(moment(startDate), moment(endDate));

  const handleOpenModal = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
  };

  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ScrollView style={styles.scrollZindex}>
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
      <Modal
        active={modalActive}
        setActive={setModalActive}
        contentSize={modalContentSize}
      >
        <View
          onLayout={(event) =>
            setModalContentSize({
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width,
            })
          }
        >
          <NewActivity modalActive={modalActive} onSubmit={() => {}} />
        </View>
        <View style={styles.modalContentPadding} />
      </Modal>

      <BottomNav FABAction={handleOpenModal} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollZindex: { position: "relative", zIndex: -100 },
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 6,
  },
  FABContainer: {
    position: "absolute",
    bottom: 16,
    right: 12,
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
  modalContentPadding: {
    height: "100%",
  },
});
