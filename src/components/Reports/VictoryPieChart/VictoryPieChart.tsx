import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { VictoryPie, Slice, VictoryLabel } from "victory-native";
import Svg from "react-native-svg";

import { ActivityTypes } from "../../../types";
import { base } from "../../../styles";
const { colors } = base;

interface Props {
  activities: ActivityTypes["activity"][];
}

const VictoryPieChart: React.FC<Props> = ({ activities }) => {
  ////////////////////////////////////////////////

  // TASKS:
  // export functions to allow unit testing?
  // refactor and tidy up to allow true data input

  ////////////////////////////////////////////////

  if (activities.length < 8) {
    // sort items to make bigger segments display on the left
    activities.sort((a, b) => {
      return a.total - b.total;
    });
    // testing add unused time
    activities.unshift({
      color: "#f1f1f1",
      title: "Unused",
      total: 30,
    });
  }

  let total = 0;
  for (let i = 0, j = activities.length; i < j; i++) {
    total += activities[i].total;
  }
  const data = [];
  const colorScale = [];
  for (let i = 0, j = activities.length; i < j; i++) {
    data.push({
      x:
        activities[i].title === "Unused"
          ? " "
          : `${Math.floor((activities[i].total / total) * 100)}%`,
      y: activities[i].total,
    });
    colorScale.push(activities[i].color);
  }

  return (
    <View style={styles.container}>
      <Svg width={300} height={300} style={{ width: "100%", height: "auto" }}>
        <VictoryPie
          standalone={false}
          height={300}
          width={300}
          // @ts-expect-error VictoryPie types
          colorScale={colorScale}
          data={data}
          labelRadius={120}
          radius={110}
          padAngle={1}
          innerRadius={({ datum }) => {
            const percentage = (datum.y / total) * 100;
            const radius = 110;
            let output = (percentage - radius) * -1 - percentage - 6;
            if (output < 0) output = 0;
            if (datum.x === " ") output = 108;
            return output;
          }}
          style={{
            labels: {
              fill: colors.headingSecondary,
              fontSize: 14,
              textTransform: "uppercase",
            },
            parent: { backgroundColor: "white" },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        // Selected data
                        // @ts-expect-error VictoryPie internal types
                        alert(props.style.fill);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </Svg>
    </View>
  );
};

export default VictoryPieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
