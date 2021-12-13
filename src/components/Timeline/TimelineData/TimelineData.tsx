import React, { useState } from 'react';
import moment from 'moment';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { DataChart, Title, ItemsKey } from '../../Common';
import { useTimelineData } from './hooks';
import { screenSize, colors, text } from '../../../styles';

const currentYear = new Date(Date.now()).getFullYear();
const years: JSX.Element[] = [];
for (let i = 1990, j = currentYear; i < j + 1; i++) {
  years.unshift(
    <Picker.Item
      key={i}
      label={`${i}`}
      value={i}
      color={colors.textPrimary}
      style={{ ...text.main }}
    />
  );
}
const currentMonth = new Date(Date.now()).getMonth();
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const months: JSX.Element[] = [];
monthNames.forEach((el, i) => {
  months.push(
    <Picker.Item
      key={el}
      label={el}
      value={i}
      color={colors.textPrimary}
      style={{ ...text.main }}
    />
  );
});

const TimelineData = () => {
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);

  const { data, summary } = useTimelineData(month, year);

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
        <View style={styles.monthYearPickerContainer}>
          <Picker
            style={[styles.pickerStyle]}
            selectedValue={month}
            onValueChange={(value) => {
              setMonth(value);
            }}
          >
            {months}
          </Picker>
          <Picker
            style={[styles.pickerStyle]}
            selectedValue={year}
            onValueChange={(value) => {
              setYear(value);
            }}
          >
            {years}
          </Picker>
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
        <ItemsKey items={summary.summary || []} />
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
    marginBottom: 8,
  },
  monthYearPickerContainer: {
    alignItems: 'flex-end',
  },
  pickerStyle: {
    width: 150,
    marginVertical: 2,
  },
  dataChart: {
    width: screenSize.width - 24,
    marginBottom: 19,
    marginTop: 6,
  },
});
