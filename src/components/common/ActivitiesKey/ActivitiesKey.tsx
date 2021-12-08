import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GroupSummaryWithName } from '../../../types';

import { ActivityTotal } from '../ActivityTotal';
import { hoursToHoursAndMinutes } from '../../../utils';

interface Props {
  activities: GroupSummaryWithName[];
}

const ActivitiesKey: React.FC<Props> = ({ activities }) => {
  // build arrays to be rendered
  const leftCol = [];
  const rightCol = [];

  for (let i = 0, j = activities.length || 0; i < j; i++) {
    if (i % 2 === 0)
      leftCol.push(
        <ActivityTotal
          key={i}
          color={activities[i].color}
          title={activities[i].group}
          total={hoursToHoursAndMinutes(activities[i].totalTime)}
        />
      );
    if (i % 2 !== 0)
      rightCol.push(
        <ActivityTotal
          key={i}
          color={activities[i].color}
          title={activities[i].group}
          total={hoursToHoursAndMinutes(activities[i].totalTime)}
        />
      );
  }

  return (
    <View style={styles.container}>
      <View>{leftCol}</View>
      <View>{rightCol}</View>
    </View>
  );
};

export default ActivitiesKey;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
