import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivitiesKey, BottomNav, Header, Title } from '../Components/Common';
import { VictoryPieChart } from '../Components/Statistics';
import { CreateUpdateModalProvider } from '../Providers';

import { base } from '../styles/base';
const { screen } = base;

const MainStatistics = () => {
  const data = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  };

  return (
    <View style={screen}>
      <Header statusBar="light" />
      <ScrollView style={styles.scrollZindex}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title
              title="statistics"
              subtitle={`${moment(data.startDate).format('MMM Do')} - ${moment(
                data.endDate
              )
                .subtract(1, 'days')
                .format('MMM Do')}`}
            />
          </View>
          <VictoryPieChart activities={[]} />
          <ActivitiesKey activities={[]} />
        </View>
      </ScrollView>
      <CreateUpdateModalProvider>
        <BottomNav />
      </CreateUpdateModalProvider>
    </View>
  );
};

export default MainStatistics;

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
});
