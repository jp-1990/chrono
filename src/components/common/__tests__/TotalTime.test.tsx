import React from 'react';
import { render } from '@testing-library/react-native';

import { TotalTime } from '../TotalTime';

describe('TotalTime component', () => {
  const recorded = {
    hours: 100,
    minutes: 30,
  };
  it('renders', () => {
    const { getByText } = render(
      <TotalTime recorded={recorded} possible={168} />
    );
    expect(getByText('TOTAL')).toBeTruthy();
  });
});
