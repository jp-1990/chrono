import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useCreateUpdateModalContext } from '../../../Providers';
import { FAB } from '../FAB';
import { colors } from '../../../styles';

const BottomNav: React.FC = () => {
  const { actions } = useCreateUpdateModalContext();
  // useNavigation hook works with react context in the background and provides the navigation object from the current screen
  const navigation = useNavigation();
  const route = useRoute();

  // useRoute provides route object from current screen

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
        <FAB onPress={actions.openCreateModal} />
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
        onPress={() => null}
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
    height: 44,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  pressed: {
    backgroundColor: colors.buttonTextRipple,
  },
  selected: {},
});
