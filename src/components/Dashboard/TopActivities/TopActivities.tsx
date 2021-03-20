import React from "react";
import { View } from "react-native";

import ActivityTotal from "../../Common/ActivityTotal/ActivityTotal";
import { ActivityTypes } from "../../../types";
import { base } from "../../../styles";

const { colors } = base;

interface Props {
  activities: ActivityTypes["activity"][];
}

const TopActivities: React.FC<Props> = ({ activities }) => {
  // build array to be rendered
  const renderedActivities = [];
  // enforce only 3 items to be rendered
  for (let i = 0; i < 3; i++) {
    renderedActivities.push(
      <ActivityTotal
        key={i}
        color={activities[i].color || colors.textPrimary}
        title={activities[i].title}
        total={activities[i].total}
        totalVisible={true}
      />
    );
  }

  return <View>{renderedActivities}</View>;
};

export default TopActivities;
