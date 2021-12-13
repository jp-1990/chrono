import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNav, Header, Title } from '../Components/Common';
import { ModalProvider } from '../Providers';

import { base } from '../styles';
const { screen } = base;

const Profile = () => {
  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ModalProvider>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title title={'profile'} subtitle="Coming soon..." />
          </View>
        </View>
        <View style={styles.flex} />
        <BottomNav />
      </ModalProvider>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  flex: {
    flex: 1,
  },
});
