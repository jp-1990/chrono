import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import constants from 'expo-constants';

import { colors, screenSize } from '../../../styles';
import { GroupSummaryWithName } from '../../../types';
import { ItemsKey, Text, TotalTime } from '../../Common';
import { hoursToHoursAndMinutes } from '../../../utils';

interface Props {
  closeModal(): void;
  modalActive: boolean;
  selectedGroup: (GroupSummaryWithName & { dateRange: string }) | null;
}
const Content: React.FC<Props> = ({ selectedGroup }) => {
  const total = selectedGroup?.totalTime || 1;
  const colorScale: string[] = [];
  const tasks = [];
  const data = [];

  const keys = Object.keys(selectedGroup?.tasks || {});
  for (const key of keys) {
    if (!selectedGroup) break;
    colorScale.push(selectedGroup.tasks[key].color || 'grey');
    tasks.push({
      title: key,
      ...selectedGroup.tasks[key],
    });
    data.push({
      x: `${Math.floor(
        ((selectedGroup.tasks[key].totalTime || 1) / total) * 100
      )}%`,
      y: selectedGroup.tasks[key].totalTime || 1,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollZindex}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.headerText} ellipsizeMode="tail">
            {selectedGroup?.group}
          </Text>
          <Text variant="sp">{selectedGroup?.dateRange}</Text>
        </View>
        <View style={styles.pieChartContainer}>
          <Svg
            width={300}
            height={300}
            style={{ width: '100%', height: 'auto' }}
          >
            <VictoryPie
              standalone={false}
              height={300}
              width={300}
              colorScale={colorScale}
              data={data}
              labelRadius={120}
              radius={110}
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
        {/* <View style={styles.spacer} /> */}
        {/* <Comparison activities={groups || []} /> */}
        <View style={styles.spacer} />
        <TotalTime
          recorded={hoursToHoursAndMinutes(selectedGroup?.totalTime)}
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
    paddingBottom: 36,
  },
  scrollZindex: {
    position: 'relative',
    zIndex: -100,
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
});
