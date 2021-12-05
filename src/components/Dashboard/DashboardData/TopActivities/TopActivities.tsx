import React from 'react';
import { View, ViewStyle } from 'react-native';

import { ActivityTotal, Text } from '../../../Common';
import { GroupSummaryWithName } from '../../../../types';
import { hoursToHoursAndMinutes } from '../../../../utils';
import { colors } from '../../../../styles';

interface Props {
  activities: GroupSummaryWithName[] | undefined;
  title: string;
  style?: ViewStyle;
}

const TopActivities: React.FC<Props> = ({ activities, title, style }) => {
  // build array to be rendered
  const renderedActivities: React.ReactNode[] = [];
  // enforce only 3 items to be rendered
  if (activities) {
    for (let i = 0, j = Math.min(3, activities.length); i < j; i++) {
      const totalTime = hoursToHoursAndMinutes(activities[i].totalTime);
      renderedActivities.push(
        <ActivityTotal
          key={activities[i].group}
          color={activities[i].color || colors.textPrimary}
          title={activities[i].group}
          total={totalTime}
        />
      );
    }
  }

  return (
    <View style={style}>
      <Text variant="h3" style={{ marginBottom: 8 }}>
        {title}
      </Text>
      {renderedActivities}
    </View>
  );
};

export default TopActivities;
