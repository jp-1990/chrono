import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { colors } from '../../../styles';

interface Props {
  recorded: {
    hours: number;
    minutes: number;
  };
  possible: number;
  style?: ViewStyle;
}

const TotalTime: React.FC<Props> = ({ recorded, possible, style }) => {
  return (
    <View style={style}>
      <Text variant="h3">TOTAL</Text>

      <Text variant="h4" style={styles.recorded}>
        [ {recorded.hours || '   '} hours{' '}
        {Math.round(recorded.minutes) || '   '} mins ] recorded
      </Text>
      <Text variant="sp" style={styles.possible}>
        of [ {possible || '   '} hours ] possible
      </Text>
    </View>
  );
};

export default TotalTime;

const styles = StyleSheet.create({
  recorded: {
    color: colors.textPrimary,
    marginTop: 4,
  },
  possible: {
    marginTop: 4,
  },
});
