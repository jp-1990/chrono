import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../Text/Text';
import { colors, screenSize } from '../../../styles';

interface Props {
  color: string;
  title: string;
  total?: { hours: number; minutes: number };
  totalVisible?: boolean;
}

// basic summary of activity containing title, color and total hours
const ActivityTotal: React.FC<Props> = ({
  color,
  title,
  total,
  totalVisible = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.color, backgroundColor: color }}></View>
      <Text
        variant="sp"
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      {totalVisible && total ? (
        <Text variant="sp" style={styles.total}>
          {`[ ${total.hours} h ${
            total.minutes > 1 ? `${Math.round(total.minutes)} m` : ''
          } ]`}
        </Text>
      ) : null}
    </View>
  );
};

export default ActivityTotal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 3,
    alignItems: 'center',
    maxWidth: screenSize.width / 2 - 16,
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 2,
  },
  title: {
    textTransform: 'capitalize',
    marginHorizontal: 10,
    color: colors.textPrimary,
    maxWidth: 65,
  },
  total: {
    color: colors.headingPrimary,
  },
});
