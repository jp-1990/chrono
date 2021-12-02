import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, ViewStyle, ScrollView, Button } from "react-native";
import moment from "moment";

import ChartRow from "./ChartRow/ChartRow";
import Text from "../Text/Text";

import {
  TaskDataWithMarginAndWidth,
  TasksDataWithMarginAndWidth,
} from "../../../types/data";
import { addDayUnixString, durationInHours } from "../../../utils";
import { colors, screenSize } from "../../../styles";

interface Props {
  start: number;
  end: number;
  data: TasksDataWithMarginAndWidth | undefined;
  style?: ViewStyle;
  internalWidth?: number;
  setSelectedTask: React.Dispatch<
    React.SetStateAction<TaskDataWithMarginAndWidth | undefined>
  >;
}

const DataChart: React.FC<Props> = ({
  data,
  start,
  end,
  style,
  internalWidth = screenSize.width * 2,
  setSelectedTask,
}) => {
  const [scrollViewWidth, setScrollViewWidth] = useState<number>();
  const scrollRef = useRef<ScrollView>(null);

  const scrollToNow = () => {
    const now = moment();
    const startOfToday = moment().startOf("day");
    const hoursPassed = durationInHours(startOfToday, now);
    const percentageOfDay = hoursPassed / 24;
    const scrollTarget = internalWidth * percentageOfDay;
    const viewOffset = (scrollViewWidth || 200) / 2;
    return scrollTarget - viewOffset;
  };

  useEffect(() => {
    scrollViewWidth &&
      scrollRef.current?.scrollTo({
        x: scrollToNow(),
      });
  }, [scrollViewWidth]);

  const chartRows = [];
  const chartDates = [];
  let unixDay = start;
  let safety = 0;
  // build array of chart rows to render
  while (safety < 100 && unixDay !== end) {
    const date = moment(Number(unixDay)).date();
    const rowData = data && data[unixDay];
    chartRows.push(
      <ChartRow
        key={safety}
        date={date}
        data={rowData}
        setSelectedTask={setSelectedTask}
      />
    );
    chartDates.push(
      <Text key={safety} style={styles.columnLabels} variant="sp">
        {date}
      </Text>
    );
    unixDay = addDayUnixString(unixDay);
    safety++;
  }

  const times = [];
  for (let i = 0; i < 25; i++) {
    const labelModifier = internalWidth > 500 ? 4 : 8;
    let timeString = "";
    if (i < 10) timeString = `0${i}:00`;
    if (i >= 10) timeString = `${i}:00`;
    times.push(
      <View
        key={i}
        style={[
          styles.timeLabelContainer,
          {
            opacity: i % labelModifier === 0 ? 1 : 0,
            width: (internalWidth - 40) / 24,
          },
        ]}
      >
        <Text
          variant="sp"
          numberOfLines={1}
          ellipsizeMode="clip"
          style={styles.timeLabel}
        >
          {timeString}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.datesColumn}>{chartDates}</View>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
      >
        <View style={[styles.scrollViewInner, { width: internalWidth }]}>
          <View style={styles.timesHeader}>{times}</View>
          {chartRows}
        </View>
      </ScrollView>
    </View>
  );
};

export default DataChart;

const styles = StyleSheet.create({
  container: {
    color: "#000",
    height: "auto",
    width: screenSize.width,
    flexDirection: "row",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewInner: {
    marginBottom: 10,
  },
  chart: {
    flex: 1,
  },
  timesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  timeLabelContainer: {
    justifyContent: "center",
    height: 20,
  },
  timeLabel: {
    width: 50,
    textAlign: "center",
    transform: [{ translateX: -25 }],
  },
  datesColumn: {
    marginRight: 5,
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  columnLabels: {
    color: colors.headingSecondary,
    height: 30,
    paddingVertical: 5,
    textAlignVertical: "center",
    textAlign: "center",
  },
  labels: {
    color: colors.headingSecondary,
  },
});
