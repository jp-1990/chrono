import React from 'react';
import { View } from 'react-native';

import { Header, BottomNav } from '../Components/Common';
import { DashboardData, DashboardModal } from '../Components/Dashboard';

import { ModalProvider } from '../Providers';

import { base } from '../styles';
const { screen } = base;

const Dashboard = () => {
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ModalProvider>
        <DashboardData />
        <DashboardModal />
        <BottomNav />
      </ModalProvider>
    </View>
  );
};

export default Dashboard;
