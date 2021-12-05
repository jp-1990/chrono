import React from 'react';
import { View, StyleSheet } from 'react-native';

import ActivityTotal from '../ActivityTotal/ActivityTotal';

interface Props {
  activities: {
    color: string;
    title: string;
    total: { hours: number; minutes: number };
  }[];
}

const ActivitiesKey: React.FC<Props> = ({ activities }) => {
  // activities contains array of objects with color, title and total

  // build arrays to be rendered
  const leftCol = [];
  const rightCol = [];

  for (let i = 0, j = activities.length; i < j; i++) {
    if (i % 2 === 0)
      leftCol.push(
        <ActivityTotal
          key={i}
          color={activities[i].color}
          title={activities[i].title}
          total={activities[i].total}
          totalVisible={false}
        />
      );
    if (i % 2 !== 0)
      rightCol.push(
        <ActivityTotal
          key={i}
          color={activities[i].color}
          title={activities[i].title}
          total={activities[i].total}
          totalVisible={false}
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
