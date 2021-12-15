import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import constants from 'expo-constants';

import { colors, screenSize } from '../../../styles';
import { ItemsKey, Text, TotalTime, Comparison } from '../../Common';
import { hoursToHoursAndMinutes } from '../../../utils';
import { SelectedGroupState } from '../../../Providers';

interface Props {
  closeModal(): void;
  modalActive: boolean;
  selectedGroup: SelectedGroupState | null;
}
const Content: React.FC<Props> = ({ selectedGroup }) => {
  const total = selectedGroup?.group.totalTime || 1;
  const colorScale: string[] = [];
  const tasks = [];
  const data = [];

  const keys = Object.keys(selectedGroup?.group.tasks || {});
  for (const key of keys) {
    if (!selectedGroup?.group) break;
    colorScale.push(selectedGroup.group.tasks[key].color || 'grey');
    tasks.push({
      title: key,
      ...selectedGroup.group.tasks[key],
    });
    data.push({
      x: `${(
        ((selectedGroup.group.tasks[key].totalTime || 1) / total) *
        100
      ).toFixed(2)}%`,
      y: selectedGroup.group.tasks[key].totalTime || 1,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollZindex}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <View style={styles.header}>
          <Text variant="h2" style={styles.headerText} ellipsizeMode="tail">
            {selectedGroup?.group.group}
          </Text>
          <Text variant="sp">{selectedGroup?.group.dateRange}</Text>
        </View>

        <View style={styles.pieChartContainer}>
          <Svg width={330} height={300} style={styles.pieChart}>
            <VictoryPie
              standalone={false}
              height={300}
              width={330}
              colorScale={colorScale}
              data={data}
              labelRadius={120}
              radius={105}
              padAngle={0}
              style={{
                labels: {
                  fill: colors.headingSecondary,
                  fontSize: 14,
                  textTransform: 'uppercase',
                },
                parent: { backgroundColor: 'white' },
              }}
            />
          </Svg>
        </View>
        <ItemsKey items={tasks || []} />

        <View style={styles.spacer} />
        <Comparison
          range={
            selectedGroup?.prevGroup.dateRange
              ? +selectedGroup?.prevGroup.dateRange + 1
              : 0
          }
          groups={selectedGroup?.group ? [selectedGroup?.group] : []}
          prevGroups={
            selectedGroup?.prevGroup ? [selectedGroup?.prevGroup] : []
          }
        />
        <View style={styles.spacer} />
        <TotalTime
          recorded={hoursToHoursAndMinutes(selectedGroup?.group.totalTime)}
        />
      </ScrollView>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    height: screenSize.height - 36 - constants.statusBarHeight,
    paddingHorizontal: 12,
  },
  scrollZindex: {
    position: 'relative',
    zIndex: -100,
  },
  scrollViewContentContainer: {
    paddingBottom: 19,
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  headerText: {
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  pieChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    marginBottom: 19,
  },
  pieChart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
