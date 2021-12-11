import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie } from 'victory-native';

import { colors } from '../../../styles';
import { GroupSummaryWithName } from '../../../types';

interface Props {
  closeModal(): void;
  modalActive: boolean;
  selectedGroup: GroupSummaryWithName | null;
}
const Content: React.FC<Props> = ({
  modalActive,
  closeModal,
  selectedGroup,
}) => {
  const total = selectedGroup?.totalTime || 1;
  const colorScale: string[] = [];

  const keys = Object.keys(selectedGroup?.tasks || {});
  const data = keys.map((key) => {
    colorScale.push(selectedGroup?.tasks[key].color || 'grey');
    return {
      x: `${Math.floor(
        ((selectedGroup?.tasks[key].totalTime || 1) / total) * 100
      )}%`,
      y: selectedGroup?.tasks[key].totalTime || 1,
    };
  });

  return (
    <View style={styles.container}>
      {/* <ScrollView style={styles.scrollZindex}> */}
      <View style={styles.container}>
        <Svg width={300} height={300} style={{ width: '100%', height: 'auto' }}>
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
      {/* <TasksKey tasks={groups || []} /> */}
      {/* <View style={styles.spacer} /> */}
      {/* <Comparison activities={groups || []} /> */}
      {/* <View style={styles.spacer} />
<TotalTime
 recorded={totalRecorded}
 possible={totalPossible}
/>*/}
      {/* </ScrollView> */}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  scrollZindex: {
    position: 'relative',
    zIndex: -100,
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  spacer: {
    marginBottom: 19,
  },
});
