import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ActivityTotal } from '../ActivityTotal';
import { hoursToHoursAndMinutes } from '../../../utils';
import { Text } from '../Text';

interface Items {
  totalTime: number;
  color: string;
  group?: string;
  title?: string;
  [key: string]: unknown;
}
interface Props {
  items: Items[];
  title?: string;
}

const ItemsKey: React.FC<Props> = ({ items, title }) => {
  const itemsCopy = [...items];
  // build arrays to be rendered
  const leftCol = [];
  const rightCol = [];

  itemsCopy?.sort((a, b) => b.totalTime - a.totalTime);

  for (let i = 0, j = itemsCopy.length || 0; i < j; i++) {
    const itemTitle = itemsCopy[i]?.group || itemsCopy[i]?.title || '';
    if (i % 2 === 0)
      leftCol.push(
        <ActivityTotal
          key={i}
          color={itemsCopy[i].color}
          title={itemTitle}
          total={hoursToHoursAndMinutes(itemsCopy[i].totalTime)}
        />
      );
    if (i % 2 !== 0)
      rightCol.push(
        <ActivityTotal
          key={i}
          color={itemsCopy[i].color}
          title={itemTitle}
          total={hoursToHoursAndMinutes(itemsCopy[i].totalTime)}
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

export default ItemsKey;

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
