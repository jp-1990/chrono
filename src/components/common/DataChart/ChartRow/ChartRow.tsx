import React from 'react';
import { View, StyleSheet } from 'react-native';

import DataBar from './DataBar';

import { TaskDataWithMarginAndWidth } from '../../../../types/data';
import { useModalContext } from '../../../../Providers';

interface Props {
  data: TaskDataWithMarginAndWidth[] | undefined;
}

const ChartRow: React.FC<Props> = ({ data }) => {
  const { actions } = useModalContext();

  // create array of databars to render in row
  const renderedBars = data?.map((el: TaskDataWithMarginAndWidth) => {
    const handleOnPress = () => {
      actions.openUpdateModal(el);
    };
    return <DataBar key={el.id} data={el} onPress={handleOnPress} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.dataBars}>{renderedBars}</View>
    </View>
  );
};

export default ChartRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 1,
    paddingVertical: 2,
    marginHorizontal: 20,
    flex: 1,
    backgroundColor: '#fafafa',
  },
  dataBars: {
    height: 24,
    flexDirection: 'row',
    flex: 1,
  },
});
