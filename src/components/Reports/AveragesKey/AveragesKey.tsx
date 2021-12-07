import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ActivityTotal } from '../../Common';
import { ActivityTypes } from '../../../types';

import { colors } from '../../../styles';

interface Props {
  activities: ActivityTypes['activity'][];
}

const AveragesKey: React.FC<Props> = ({ activities }) => {
  // activities contains array of items with color, title and total

  // activity items to render
  const renderedItems = [];
  for (let i = 0, j = activities.length; i < j; i++) {
    renderedItems.push(
      <View key={i} style={styles.row}>
        <ActivityTotal
          color={activities[i].color || colors.textPrimary}
          title={activities[i].title}
          total={{ hours: activities[i].total, minutes: 0 }}
          totalVisible={true}
        />
        <View>
          <Text
            style={styles.averageText}
          >{`${activities[i].total} hours`}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.titles}>
        <View>
          <Text style={styles.averageTitle}>Average</Text>
          <Text style={styles.averageTitle}>p/week</Text>
        </View>
      </View>
      {renderedItems}
    </View>
  );
};

export default AveragesKey;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  averageTitle: {
    fontSize: 15,
    fontFamily: 'lato-light',
    color: colors.headingPrimary,
  },
  averageText: { color: colors.headingSecondary },
});
