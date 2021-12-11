import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ActivityTotal, Text } from '../../Common';
import { GroupSummaryWithName } from '../../../types';

import { colors } from '../../../styles';

interface Props {
  activities: GroupSummaryWithName[];
  title?: string;
}

const Comparison: React.FC<Props> = ({ activities, title }) => {
  // activities contains array of items with color, title and total

  // activity items to render
  const renderedItems = [];
  for (let i = 0, j = activities.length; i < j; i++) {
    // placeholder value
    const temp = [3, 2, 5, 8, 1, 4, 6, 3, 12, 9];
    const percentage = i % 2 === 0 ? `+ ${temp[i]}%` : `- ${temp[i]}%`;
    const value =
      i % 2 === 0 ? `[ + ${temp[i]} hours ]` : `[ - ${temp[i]} hours ]`;
    const tempstyle =
      i % 2 === 0 ? { color: colors.positive } : { color: colors.negative };

    renderedItems.push(
      <View key={i} style={styles.row}>
        <ActivityTotal
          color={activities[i].color || colors.textPrimary}
          title={activities[i].group}
          total={{ hours: activities[i].totalTime, minutes: 0 }}
          totalVisible={false}
        />
        <View style={styles.percentageContainer}>
          <Text
            variant="main"
            style={{ ...styles.percentageText, ...tempstyle }}
          >
            {percentage}
          </Text>
          <Text variant="main" style={styles.valueText}>
            {value}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titles}>
        <Text variant="h3">{title || 'COMPARISON'}</Text>
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Text variant="main" style={styles.month}>
              jan
            </Text>
            <Text variant="main" style={styles.year}>
              {' '}
              2021
            </Text>
          </View>
          <Text variant="main" style={styles.vs}>
            vs
          </Text>
          <View style={styles.date}>
            <Text variant="main" style={styles.month}>
              dec
            </Text>
            <Text variant="main" style={styles.year}>
              {' '}
              2020
            </Text>
          </View>
        </View>
      </View>
      {renderedItems}
    </View>
  );
};

export default Comparison;

const styles = StyleSheet.create({
  titles: {
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
  },
  percentageText: {
    width: 45,
  },
  valueText: {
    color: colors.headingPrimary,
    fontFamily: 'lato-light',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    flexDirection: 'row',
  },
  month: {
    textTransform: 'uppercase',
    color: colors.headingPrimary,
    fontFamily: 'lato-bold',
    fontSize: 16,
  },
  year: {
    color: colors.headingSecondary,
    fontFamily: 'lato-light',
    fontSize: 16,
  },
  vs: {
    color: colors.headingSecondary,
    marginHorizontal: 8,
  },
});
