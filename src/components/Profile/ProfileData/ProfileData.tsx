import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from '../../Common';

const ProfileData = () => {
  return (
    <View style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title title={'profile'} subtitle="Coming soon..." />
        </View>
      </View>
    </View>
  );
};

export default ProfileData;

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
