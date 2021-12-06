import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import moment from 'moment';

import { Title, DataChart } from '../../../Components/Common';
import { TopActivities } from './TopActivities';
import { TotalTime } from './TotalTime';
import { useDashboardData } from './hooks';

import { screenSize } from '../../../styles';

const DashboardData = () => {
  const { data, summary } = useDashboardData();

  return (
    <ScrollView style={styles.scrollZindex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title
            title="dashboard"
            subtitle={`${moment(data.startDate).format('MMM Do')} - ${moment(
              data.endDate
            )
              .subtract(1, 'days')
              .format('MMM Do')}`}
          />
        </View>
        <View>
          <DataChart
            style={styles.dataChart}
            data={data.tasks}
            start={data.startDate}
            end={data.endDate}
          />
        </View>
        <TopActivities
          style={styles.topActivities}
          title="TOP ACTIVITIES"
          activities={summary.topActivities}
        />

        <TotalTime
          style={styles.totalTime}
          recorded={summary.totalRecorded}
          possible={summary.totalPossible}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardData;

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
  dataChart: {
    width: screenSize.width - 24,
    marginBottom: 19,
    marginTop: 12,
  },
  topActivities: {
    marginHorizontal: 24,
    marginBottom: 19,
  },
  totalTime: {
    marginHorizontal: 24,
  },
});
