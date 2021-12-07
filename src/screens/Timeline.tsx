import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import Header from '../Components/Common/Header/Header';
import Title from '../Components/Common/Title/Title';
import DataChart from '../Components/Common/DataChart/DataChart';
import SelectedMonth from '../Components/Common/SelectedMonth/SelectedMonth';
import ActivitiesKey from '../Components/Common/ActivitiesKey/ActivitiesKey';
import MainButton from '../Components/Common/MainButton/MainButton';
import BottomNav from '../Components/Common/BottomNav/BottomNav';

import { base, colors } from '../styles/base';
import { CreateUpdateModalProvider } from '../Providers';

const { screen } = base;

// test data
const testinfo = [
  [
    { color: 'blue', width: '14%', margin: null },
    { color: 'green', width: '35%', margin: '8%' },
    { color: 'blue', width: '10%', margin: '33%' },
  ],
  [
    { color: 'blue', width: '12%', margin: null },
    { color: 'green', width: '35%', margin: '10%' },
    { color: 'blue', width: '13%', margin: '30%' },
  ],
  [
    { color: 'blue', width: '14%', margin: null },
    { color: 'green', width: '35%', margin: '8%' },
    { color: 'red', width: '25%', margin: '6%' },
    { color: 'blue', width: '10%', margin: '2%' },
  ],
  [
    { color: 'blue', width: '35%', margin: null },
    { color: 'red', width: '28%', margin: '7%' },
    { color: 'blue', width: '10%', margin: '20%' },
  ],
  [
    { color: 'blue', width: '35%', margin: null },
    { color: 'red', width: '20%', margin: '10%' },
    { color: 'red', width: '28%', margin: '2%' },
    { color: 'blue', width: '2%', margin: '3%' },
  ],
  [
    { color: 'blue', width: '12%', margin: null },
    { color: 'green', width: '35%', margin: '10%' },
    { color: 'blue', width: '13%', margin: '30%' },
  ],
  [
    { color: 'blue', width: '35%', margin: null },
    { color: 'red', width: '20%', margin: '10%' },
    { color: 'red', width: '28%', margin: '2%' },
    { color: 'blue', width: '2%', margin: '3%' },
  ],
];

const testData: any = [];
let j = 0;
for (let i = 1; i <= 31; i++) {
  if (j === testinfo.length) j = 0;
  testData.push({ [i]: testinfo[j] });
  j++;
}

const Timeline = () => {
  return (
    <CreateUpdateModalProvider>
      <View style={screen}>
        <Header statusBar="light" />
        <ScrollView style={styles.scrollZindex} fadingEdgeLength={50}>
          <View style={styles.containerPadding}>
            <View style={styles.titleWrapper}>
              <View style={styles.titleBox}>
                <View style={styles.titleContainer}>
                  <Title title="timeline" subtitle="" />
                </View>
                <View>
                  <SelectedMonth month="january" year={2021} />
                </View>
              </View>
            </View>
            <View>
              <DataChart
                data={testData}
                start={new Date('12/01/2021').valueOf()}
                end={new Date(Date.now()).valueOf()}
              />
            </View>
            <View>
              <ActivitiesKey activities={[]} />
            </View>
            <View style={styles.center}>
              <MainButton
                label="New Activity"
                width="55%"
                colorBG={colors.buttonPrimary}
                colorText={colors.buttonText}
                ripple={colors.buttonPrimaryRipple}
                onPress={() => null}
              />
            </View>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </CreateUpdateModalProvider>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 30,
    paddingBottom: 45,
    paddingTop: 29,
  },
  scrollZindex: { position: 'relative', zIndex: -100 },
  titleWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  titleContainer: {
    marginBottom: 8,
    marginRight: 10,
  },
  subtitleBox: {
    width: '100%',
    marginBottom: 15,
  },

  center: {
    alignItems: 'center',
  },
});
