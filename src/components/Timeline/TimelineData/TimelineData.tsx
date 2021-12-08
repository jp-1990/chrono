import moment from 'moment';
import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { DataChart, Title, ActivitiesKey } from '../../Common';
import { useTimelineData } from './hooks';
import { screenSize } from '../../../styles';

const TimelineData = () => {
  const { data, summary } = useTimelineData(30);

  return (
    <ScrollView style={styles.scrollZindex}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title
            title="timeline"
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
            internalWidth={screenSize.width - 48}
          />
        </View>
        <ActivitiesKey activities={summary.summary || []} />
      </View>
    </ScrollView>
  );
};

export default TimelineData;

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
});
