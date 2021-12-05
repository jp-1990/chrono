import React from 'react';
import { render } from '@testing-library/react-native';

import { TopActivities } from '../TopActivities';

describe('TopActivities component', () => {
  const activities = [
    {
      color: 'red',
      group: 'group_a',
      totalTime: 100,
      totalAsPercentage: 1,
      averagePerWeek: 1,
      tasks: {},
    },
  ];

  it('renders', () => {
    const { getByText } = render(
      <TopActivities title="TOP ACTIVITIES" activities={activities} />
    );
    expect(getByText('TOP ACTIVITIES')).toBeTruthy();
  });
});
