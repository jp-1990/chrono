/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';

import { colors } from '../../../styles';
import { GroupSummaryWithName } from '../../../types';

const handleSelectActivity = (
  activities: GroupSummaryWithName[],
  target: string,
  setSelectedGroup: (group: GroupSummaryWithName) => void
) => {
  const output = activities.find((el) => el.group === target) || null;
  if (output) setSelectedGroup(output);
};

interface Props {
  activities: GroupSummaryWithName[];
  setSelectedGroup: (group: GroupSummaryWithName) => void;
}
const VictoryPieChart: React.FC<Props> = ({ activities, setSelectedGroup }) => {
  const total = activities.reduce((total, current) => {
    return total + current.totalTime;
  }, 0);
  const data = [];
  const colorScale = [];
  for (let i = 0, j = activities.length; i < j; i++) {
    data.push({
      x:
        activities[i].group === 'Unused'
          ? ' '
          : `${Math.floor((activities[i].totalTime / total) * 100)}%`,
      y: activities[i].totalTime,
      group: activities[i].group,
    });
    colorScale.push(activities[i].color);
  }

  return (
    <View style={styles.container}>
      <Svg width={300} height={300} style={{ width: '100%', height: 'auto' }}>
        <VictoryPie
          standalone={false}
          height={300}
          width={300}
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
            if (datum.x === ' ') output = 108;
            return output;
          }}
          style={{
            labels: {
              fill: colors.headingSecondary,
              fontSize: 14,
              textTransform: 'uppercase',
            },
            parent: { backgroundColor: 'white' },
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        handleSelectActivity(
                          activities,
                          props.slice.data.group,
                          setSelectedGroup
                        );
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
