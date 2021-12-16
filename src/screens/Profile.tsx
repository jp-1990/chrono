import React from 'react';
import { View } from 'react-native';
import { BottomNav, Header } from '../Components/Common';
import { ModalProvider } from '../Providers';
import { ProfileData, ProfileModal } from '../Components/Profile';

import { base } from '../styles';
const { screen } = base;

const Profile = () => {
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ModalProvider>
        <ProfileData />
        <ProfileModal />
        <BottomNav />
      </ModalProvider>
    </View>
  );
};

export default Profile;
