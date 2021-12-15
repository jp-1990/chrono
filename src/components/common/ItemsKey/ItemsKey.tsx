import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

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
  selectItem?: (target: string) => void;
  title?: string;
}

const ItemsKey: React.FC<Props> = ({ items, title, selectItem }) => {
  const itemsCopy = [...items];
  // build arrays to be rendered
  const leftCol = [];
  const rightCol = [];

  itemsCopy?.sort((a, b) => b.totalTime - a.totalTime);

  for (let i = 0, j = itemsCopy.length || 0; i < j; i++) {
    const itemTitle = itemsCopy[i]?.group || itemsCopy[i]?.title || '';
    const handleSelectItem =
      itemsCopy[i]?.group && selectItem
        ? () => selectItem(itemsCopy[i].group || '')
        : () => null;
    if (i % 2 === 0)
      leftCol.push(
        <Pressable key={i} onPress={handleSelectItem}>
          <ActivityTotal
            color={itemsCopy[i].color}
            title={itemTitle}
            total={hoursToHoursAndMinutes(itemsCopy[i].totalTime)}
          />
        </Pressable>
      );
    if (i % 2 !== 0)
      rightCol.push(
        <Pressable key={i} onPress={handleSelectItem}>
          <ActivityTotal
            color={itemsCopy[i].color}
            title={itemTitle}
            total={hoursToHoursAndMinutes(itemsCopy[i].totalTime)}
          />
        </Pressable>
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
