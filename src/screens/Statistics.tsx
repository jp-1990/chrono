import React from 'react';
import { View } from 'react-native';

import { BottomNav, Header } from '../Components/Common';
import { ModalProvider } from '../Providers';
import { StatisticsData, StatisticsModal } from '../Components/Statistics';

import { base } from '../styles/base';
const { screen } = base;

const Statistics = () => {
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ModalProvider>
        <StatisticsData />
        <StatisticsModal />
        <BottomNav />
      </ModalProvider>
    </View>
  );
};

export default Statistics;
