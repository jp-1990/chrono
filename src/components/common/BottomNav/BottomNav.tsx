import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useCreateUpdateModalContext } from '../../../Providers';
import { FAB } from '../FAB';
import { colors } from '../../../styles';

const BottomNav: React.FC = () => {
  const { actions } = useCreateUpdateModalContext();
  // useNavigation hook works with react context in the background and provides the navigation object from the current screen
  const navigation = useNavigation();
  // useRoute provides route object from current screen

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Dashboard')}
        style={styles.iconBox}
      >
        <MaterialCommunityIcons name="view-dashboard" size={28} color="white" />
      </Pressable>
      <Pressable onPress={() => null} style={styles.iconBox}>
        <MaterialCommunityIcons
          name="timeline-clock-outline"
          size={28}
          color="white"
        />
      </Pressable>
      <View style={styles.fabContainer}>
        <FAB onPress={actions.openCreateModal} />
      </View>
      <Pressable onPress={() => null} style={styles.iconBox}>
        <Ionicons name="stats-chart-sharp" size={28} color="white" />
      </Pressable>
      <Pressable onPress={() => null} style={styles.iconBox}>
        <Ionicons name="person" size={28} color="white" />
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
});
