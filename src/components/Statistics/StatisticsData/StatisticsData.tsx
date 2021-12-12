/* eslint-disable react/prop-types */
import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ItemsKey, Title, TotalTime } from '../../Common';

import { useStatisticsData } from './hooks';
import { useModalContext } from '../../../Providers';
import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';
import { colors } from '../../../styles';
import { GroupSummaryWithName } from '../../../types';

const handleSelectGroup = (
  groups: GroupSummaryWithName[],
  dateRange: string,
  target: string,
  setSelectedGroup: (
    group: GroupSummaryWithName & { dateRange: string }
  ) => void
) => {
  const output = groups.find((el) => el.group === target) || null;
  if (output) setSelectedGroup({ ...output, dateRange });
};

const StatisticsData = () => {
  const { state } = useStatisticsData();
  const { actions: modalActions } = useModalContext();

  const total =
    state.groups?.reduce((total, current) => {
      return total + current.totalTime;
    }, 0) || 1;
  const data = [];
  const colorScale = [];
  for (let i = 0, j = state.groups?.length || 0; i < j; i++) {
    if (!state.groups) break;
    data.push({
      x:
        state.groups[i].group === 'Unused'
          ? ' '
          : `${Math.floor((state.groups[i].totalTime / total) * 100)}%`,
      y: state.groups[i].totalTime,
      group: state.groups[i].group,
    });
    colorScale.push(state.groups[i].color);
  }

  const dateRange = `${moment(state.startDate).format('MMM Do')} - ${moment(
    state.endDate
  )
    .subtract(1, 'days')
    .format('MMM Do')}`;
  return (
    <ScrollView style={styles.scrollZindex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title title="statistics" subtitle={dateRange} />
        </View>
        <View style={styles.container}>
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
              padAngle={1}
              innerRadius={({ datum }) => {
                const percentage = (datum.y / total) * 100;
                const radius = 110;
                let output = (percentage - radius) * -1 - percentage - 6;
                if (output < 0) output = 0;
                if (datum.x === ' ') output = 108;
                return output;
              }}
              style={{
                labels: {
                  fill: colors.headingSecondary,
                  fontSize: 14,
                  textTransform: 'uppercase',
                },
                parent: { backgroundColor: 'white' },
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: 'data',
                          mutation: (props) => {
                            handleSelectGroup(
                              state.groups || [],
                              dateRange,
                              props.slice.data.group,
                              modalActions.openStatisticsModal
                            );
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
        </View>
        <ItemsKey items={state.groups || []} />
        <View style={styles.spacer} />
        <TotalTime
          recorded={state.totalRecorded}
          possible={state.totalPossible}
        />
      </View>
    </ScrollView>
  );
};

export default StatisticsData;

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
