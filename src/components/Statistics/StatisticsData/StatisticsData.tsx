/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import Svg from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { ItemsKey, Title, TotalTime, DateTimeInput, Text } from '../../Common';

import { useStatisticsData } from './hooks';
import { useModalContext } from '../../../Providers';
import { GroupSummaryWithName } from '../../../types';
import { colors } from '../../../styles';

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
  const { state, actions } = useStatisticsData();
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
          : `${((state.groups[i].totalTime / total) * 100).toFixed(2)}%`,
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
        <View style={styles.dateTimeContainer}>
          <View>
            <DateTimeInput
              label="startDate"
              icon="calendar-range"
              placeholder="Start date"
              showPicker={actions.showPicker}
              currentValue={new Date(state.queryVariables.startDate || '')}
            />
          </View>
          <Text variant="sp">{`  to  `}</Text>
          <View>
            <DateTimeInput
              label="endDate"
              icon="calendar-range"
              placeholder="End date"
              showPicker={actions.showPicker}
              currentValue={new Date(state.queryVariables.endDate || '')}
            />
          </View>
          {state.pickerVisible && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                state.pickerTarget === 'startDate'
                  ? new Date(state.queryVariables.startDate || '')
                  : new Date(state.queryVariables.endDate || '')
              }
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={actions.onDateTimeChange}
              minimumDate={
                state.pickerTarget === 'endDate'
                  ? new Date(state.queryVariables.startDate || '')
                  : undefined
              }
              maximumDate={
                state.pickerTarget === 'startDate'
                  ? new Date(state.queryVariables.endDate || '')
                  : undefined
              }
            />
          )}
        </View>
        <View style={styles.pieChartContainer}>
          <Svg
            width={330}
            height={300}
            style={{ width: '100%', height: 'auto' }}
          >
            <VictoryPie
              standalone={false}
              height={300}
              width={330}
              colorScale={colorScale}
              data={data}
              labelRadius={120}
              radius={105}
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
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    marginBottom: 19,
  },
});
