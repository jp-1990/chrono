import React from "react";
import { View } from "react-native";

import ActivityTotal from "../../common/ActivityTotal/ActivityTotal";

const TopActivities = ({ activities }) => {
  // activities contains array of items with color, title and total

  // enforce only 3 items to be rendered
  while (activities.length > 3) {
    activities.pop();
  }

  // build array to be rendered
  const renderedActivities = activities.map((e, i) => {
    return (
      <ActivityTotal key={i} color={e.color} title={e.title} total={e.total} />
    );
  });

  return <View>{renderedActivities}</View>;
};

export default TopActivities;
