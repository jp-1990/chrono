import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, BackHandler } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { StackNavProp, TabRouteProp } from '../../../Navigation';
import { useModalContext } from '../../../Providers';
import { colors } from '../../../styles';

const BottomNav: React.FC = () => {
  const { actions, state } = useModalContext();
  // useNavigation hook works with react context in the background and provides the navigation object from the current screen
  const navigation = useNavigation<StackNavProp<'App'>>();
  // useRoute provides route object from current screen
  const route = useRoute<TabRouteProp>();

  useEffect(() => {
    const handleHardwareBack = () => {
      if (navigation.canGoBack() && state.modalActive === null) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBack
    );
    return () => {
      backHandler.remove();
    };
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Dashboard')}
        style={({ pressed }) => [
          styles.iconBox,
          pressed ? styles.pressed : null,
        ]}
      >
        <MaterialCommunityIcons
          name="view-dashboard"
          size={28}
          color={route.name === 'Dashboard' ? 'white' : colors.accentPrimary}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Timeline')}
        style={({ pressed }) => [
          styles.iconBox,
          pressed ? styles.pressed : null,
        ]}
      >
        <MaterialCommunityIcons
          name="timeline-clock-outline"
          size={28}
          color={route.name === 'Timeline' ? 'white' : colors.accentPrimary}
        />
      </Pressable>
      <View style={styles.fabContainer}>
        <Pressable style={styles.fab} onPress={actions.openCreateModal}>
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Statistics')}
        style={({ pressed }) => [
          styles.iconBox,
          pressed ? styles.pressed : null,
        ]}
      >
        <Ionicons
          name="stats-chart-sharp"
          size={28}
          color={route.name === 'Statistics' ? 'white' : colors.accentPrimary}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={({ pressed }) => [
          styles.iconBox,
          pressed ? styles.pressed : null,
        ]}
      >
        <Ionicons
          name="person"
          size={28}
          color={route.name === 'Profile' ? 'white' : colors.accentPrimary}
        />
      </Pressable>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.menuSecondary,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  fabContainer: {
    top: -10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 8,
  },
  pressed: {
    backgroundColor: colors.buttonTextRipple,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});
