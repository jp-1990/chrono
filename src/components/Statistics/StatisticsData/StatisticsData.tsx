import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ItemsKey, Title, TotalTime } from '../../Common';
import { VictoryPieChart } from '../VictoryPieChart';

import { useStatisticsData } from './hooks';
import { useModalContext } from '../../../Providers';

const StatisticsData = () => {
  const { state } = useStatisticsData();
  const { actions: modalActions } = useModalContext();

  return (
    <ScrollView style={styles.scrollZindex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title
            title="statistics"
            subtitle={`${moment(state.startDate).format('MMM Do')} - ${moment(
              state.endDate
            )
              .subtract(1, 'days')
              .format('MMM Do')}`}
          />
        </View>
        <VictoryPieChart
          setSelectedGroup={modalActions.openStatisticsModal}
          activities={state.groups || []}
        />
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
