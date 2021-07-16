import React from "react";
import { View } from "react-native";

import ActivityTotal from "../../Common/ActivityTotal/ActivityTotal";
import { GroupSummaryWithName } from "../../../types";
import { hoursToHoursAndMinutes } from "../../../utils";
import { base } from "../../../styles";

const { colors } = base;

interface Props {
  activities: GroupSummaryWithName[] | undefined;
}

const TopActivities: React.FC<Props> = ({ activities }) => {
  // build array to be rendered
  const renderedActivities: React.ReactNode[] = [];
  // enforce only 3 items to be rendered
  if (activities) {
    for (let i = 0; i < 3; i++) {
      const totalTime = hoursToHoursAndMinutes(activities[i].totalTime);
      renderedActivities.push(
        <ActivityTotal
          key={i}
          color={activities[i].color || colors.textPrimary}
          title={activities[i].group}
          total={totalTime}
          totalVisible={true}
        />
      );
    }
  }

  return <View>{renderedActivities}</View>;
};

export default TopActivities;
