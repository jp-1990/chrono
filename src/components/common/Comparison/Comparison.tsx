import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, screenSize } from '../../../styles';
import { GroupSummaryWithName } from '../../../types';
import { hoursToHoursAndMinutes } from '../../../utils';
import { Text } from '../Text';

interface GroupPercentageChangeProps {
  color: string;
  title: string;
  percentageChange: number;
}
const GroupPercentageChange: React.FC<GroupPercentageChangeProps> = ({
  color,
  title,
  percentageChange,
}) => {
  let textColor;
  if (percentageChange > 0 && title !== 'unused') textColor = colors.positive;
  if (percentageChange < 0 && title !== 'unused') textColor = colors.negative;
  if (percentageChange < 0 && title === 'unused') textColor = colors.positive;
  if (percentageChange > 0 && title === 'unused') textColor = colors.negative;

  return (
    <View style={styles.colorTitle}>
      <View style={{ ...styles.color, backgroundColor: color }}></View>
      <Text
        variant="sp"
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text
        variant="sp"
        style={{
          color: textColor || colors.textSecondary,
        }}
      >
        {`${
          percentageChange < 0 ? '' : percentageChange > 0 ? '+' : ''
        }${percentageChange.toFixed(2)}%`}
      </Text>
    </View>
  );
};

interface GroupTimeChangeProps {
  timeChange: number;
}
const GroupTimeChange: React.FC<GroupTimeChangeProps> = ({ timeChange }) => {
  const time = hoursToHoursAndMinutes(
    timeChange < 0 ? timeChange * -1 : timeChange
  );

  return (
    <Text variant="sp" style={styles.time}>
      {`[${timeChange > 0 ? ' +' : ' -'}${
        time.hours > 0 ? ` ${time.hours} h` : ``
      }${time.minutes > 1 ? ` ${Math.round(time.minutes)} m` : ''} ]`}
    </Text>
  );
};

interface Props {
  groups: GroupSummaryWithName[];
  prevGroups: GroupSummaryWithName[];
  range: number;
}
const Comparison: React.FC<Props> = ({ groups, prevGroups, range }) => {
  const percentageChanges: JSX.Element[] = [];
  if (groups.length >= prevGroups.length) {
    for (const group of groups) {
      const prevTotalTime =
        prevGroups.find((el) => group.group === el.group)?.totalTime || 0;
      const percentage =
        ((group.totalTime - prevTotalTime) /
          (prevTotalTime > 0 ? prevTotalTime : 1)) *
        100;
      percentageChanges.push(
        <View key={group.group} style={styles.percentageChangeRow}>
          <GroupPercentageChange
            color={group.color}
            title={group.group}
            percentageChange={percentage}
          />
          <GroupTimeChange timeChange={group.totalTime - prevTotalTime} />
        </View>
      );
    }
  } else {
    for (const prevGroup of prevGroups) {
      const totalTime =
        groups.find((el) => prevGroup.group === el.group)?.totalTime || 0;
      const percentage =
        ((totalTime - prevGroup.totalTime) /
          (prevGroup.totalTime > 0 ? prevGroup.totalTime : 1)) *
        100;
      percentageChanges.push(
        <View key={prevGroup.group} style={styles.percentageChangeRow}>
          <GroupPercentageChange
            color={prevGroup.color}
            title={prevGroup.group}
            percentageChange={percentage}
          />
          <GroupTimeChange timeChange={totalTime - prevGroup.totalTime} />
        </View>
      );
    }
  }

  return (
    <>
      <Text variant="h3">{'COMPARISON'}</Text>
      <Text style={styles.heading} variant="sp">
        {`Compared to previous ${
          range > 1 ? `${range.toFixed()} days` : `day`
        }`}
      </Text>
      <View style={styles.container}>
        <View>{percentageChanges}</View>
      </View>
    </>
  );
};

export default Comparison;

const styles = StyleSheet.create({
  heading: {
    marginBottom: 4,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  percentageChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorTitle: {
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
  },
  time: {
    marginLeft: 10,
  },
});
