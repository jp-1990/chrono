import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ActivityTotal } from '../../Common';
import { ActivityTypes } from '../../../types';

import { colors } from '../../../styles';

interface Props {
  activities: ActivityTypes['activity'][];
}

const Comparison: React.FC<Props> = ({ activities }) => {
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
          title={activities[i].title}
          total={{ hours: activities[i].total, minutes: 0 }}
          totalVisible={false}
        />
        <View style={styles.percentageContainer}>
          <Text style={{ ...styles.percentageText, ...tempstyle }}>
            {percentage}
          </Text>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titles}>
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Text style={styles.month}>jan</Text>
            <Text style={styles.year}> 2021</Text>
          </View>
          <Text style={styles.vs}>vs</Text>
          <View style={styles.date}>
            <Text style={styles.month}>dec</Text>
            <Text style={styles.year}> 2020</Text>
          </View>
        </View>
      </View>
      {renderedItems}
    </View>
  );
};

export default Comparison;

const styles = StyleSheet.create({
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
  titles: {
    marginVertical: 15,
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
