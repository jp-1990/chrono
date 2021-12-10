import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskSummary } from '../../../types';

import { ActivityTotal } from '../ActivityTotal';
import { hoursToHoursAndMinutes } from '../../../utils';
import { Text } from '../Text';

interface Props {
  tasks: (TaskSummary & { title: string })[];
  title?: string;
}

const TasksKey: React.FC<Props> = ({ tasks, title }) => {
  const tasksCopy = [...tasks];
  // build arrays to be rendered
  const leftCol = [];
  const rightCol = [];

  tasksCopy?.sort((a, b) => b.totalTime - a.totalTime);

  for (let i = 0, j = tasksCopy.length || 0; i < j; i++) {
    if (i % 2 === 0)
      leftCol.push(
        <ActivityTotal
          key={i}
          color={tasksCopy[i].color}
          title={tasksCopy[i].title}
          total={hoursToHoursAndMinutes(tasksCopy[i].totalTime)}
        />
      );
    if (i % 2 !== 0)
      rightCol.push(
        <ActivityTotal
          key={i}
          color={tasksCopy[i].color}
          title={tasksCopy[i].title}
          total={hoursToHoursAndMinutes(tasksCopy[i].totalTime)}
        />
      );
  }

  return (
    <>
      <Text style={styles.title} variant="h3">
        {title || 'ACTIVITIES'}
      </Text>
      <View style={styles.container}>
        <View>{leftCol}</View>
        <View>{rightCol}</View>
      </View>
    </>
  );
};

export default TasksKey;

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
