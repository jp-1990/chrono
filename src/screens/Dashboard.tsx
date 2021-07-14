import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Modal } from "react-native";
import { useQuery } from "@apollo/client";
import moment from "moment";

import {
  FindTasksQuery,
  FindTasksRes,
  FindTasksArgs,
} from "../graphql/queries";
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

import { base } from "../styles";

const { colors } = base;
const { screen } = base;

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

const testData: any = [];
let j = 0;
for (let i = 1; i <= 31; i++) {
  if (j === testinfo.length) j = 0;
  testData.push({ [i]: testinfo[j] });
  j++;
}

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const { data, loading } = useQuery<FindTasksRes, FindTasksArgs>(
    FindTasksQuery,
    {
      variables: {
        scope: 10,
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const convertDateToMidnightUnixString = (date: number | string) => {
    return moment(moment(Number(date)).format("YYYY-MM-DD")).format("x");
  };
  const addDayUnixString = (date: number | string) => {
    return moment(
      moment(Number(date)).add(1, "days").format("YYYY-MM-DD")
    ).format("x");
  };

  const buildTasksDataStructure = (data: FindTasksRes | undefined) => {
    if (!data) return undefined;
    const taskData: { [key: string]: {}[] } = {};
    // loop over data returned from query
    data.findTasks.forEach((el) => {
      // keys are the day at midnight that the task starts or ends as a unix string
      const taskStartKey = convertDateToMidnightUnixString(el.start);
      const taskEndKey = convertDateToMidnightUnixString(el.end);

      // if the start key doesnt exist yet, assign an empty array to it
      if (taskData[taskStartKey] === undefined) taskData[taskStartKey] = [];

      // if the task ends on a different day to when it starts
      if (taskStartKey !== taskEndKey) {
        // if the end key doesnt exist yet, assign an empty array to it
        if (taskData[taskEndKey] === undefined) taskData[taskEndKey] = [];
        // push start of task, from start time to midnight on first day
        taskData[taskStartKey].push({
          id: el.id,
          title: el.title,
          group: el.group,
          percentageTimes: { ...el.percentageTimes, endPercentage: 100 },
          colour: el.colour,
        });
        let keyTracker = addDayUnixString(taskStartKey);
        // while covers situation where task spans any number of days
        while (taskEndKey !== keyTracker) {
          // if the tracker key doesnt exist yet, assign an empty array to it
          if (taskData[keyTracker] === undefined) taskData[keyTracker] = [];
          // push task with start and end covering entire day
          taskData[keyTracker].push({
            id: el.id,
            title: el.title,
            group: el.group,
            percentageTimes: {
              ...el.percentageTimes,
              startPercentage: 0,
              endPercentage: 100,
            },
            colour: el.colour,
          });
        }
        // push end of task, from midnight until end time on end day
        taskData[taskEndKey].push({
          id: el.id,
          title: el.title,
          group: el.group,
          percentageTimes: { ...el.percentageTimes, startPercentage: 0 },
          colour: el.colour,
        });
      } else {
        // if the task starts and ends on the same day, push to that key
        taskData[taskStartKey].push({
          id: el.id,
          title: el.title,
          group: el.group,
          percentageTimes: { ...el.percentageTimes },
          colour: el.colour,
        });
      }
    });
    console.log("=======================================");
    //console.log(taskData, Object.keys(taskData).length);

    return taskData;
  };

  const taskData = buildTasksDataStructure(data);

  const addLeftMarginAndWidth = (data) => {
    if (!data) return undefined;
    const calcLeftMargin = (prev, item) => {
      return `${
        item.percentageTimes.startPercentage -
        prev.percentageTimes.endPercentage
      }%`;
    };
    const output = { ...data };
    const keys = Object.keys(data);
    // loop over each key and access its array
    keys.forEach((key) => {
      // map the array and add margin and width properties
      output[key] = output[key].map((el, i, arr) => {
        let marginLeft = 0;
        if (i !== 0) marginLeft = calcLeftMargin(arr[i - 1], el);
        const width = `${
          el.percentageTimes.endPercentage - el.percentageTimes.startPercentage
        }%`;
        const color = el.colour;
        delete el.colour;
        return { ...el, color, width, marginLeft };
      });
    });
    return output;
  };

  const displayData = addLeftMarginAndWidth(taskData);

  const startDateToDisplay = convertDateToMidnightUnixString(
    moment().subtract(6, "days").format("x")
  );
  const endDateToDisplay = convertDateToMidnightUnixString(
    moment().add(1, "days").format("x")
  );

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
          <DataChart
            data={displayData}
            start={startDateToDisplay}
            end={endDateToDisplay}
          />
          <View style={styles.subtitleBox}>
            <Subtitle text="top categories" />
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
