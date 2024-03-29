import React from 'react';
import { View } from 'react-native';

import { Header, BottomNav } from '../Components/Common';
import { TimelineData, TimelineModal } from '../Components/Timeline';

import { base } from '../styles/base';
import { ModalProvider } from '../Providers';

const { screen } = base;

const Timeline = () => {
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ModalProvider>
        <TimelineData />
        <TimelineModal />
        <BottomNav />
      </ModalProvider>
    </View>
  );
};

export default Timeline;
