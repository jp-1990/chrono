import React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { TaskDataWithMarginAndWidth } from '../../../../types/data';

interface Props {
  data: TaskDataWithMarginAndWidth | undefined;
  onPress: () => void;
}

// renders an individual bar within the the data chart
const DataBar: React.FC<Props> = ({ data, onPress }) => {
  return (
    <Pressable
      style={{
        ...styles.dataBar,
        backgroundColor: data?.color,
        width: data?.width,
        marginLeft: data?.marginLeft ? data.marginLeft : 0,
      }}
      android_ripple={{
        borderless: false,
        radius: 150,
      }}
      onPress={onPress}
    />
  );
};

export default DataBar;

const styles = StyleSheet.create({
  dataBar: {
    height: 24,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#e3e3e3',
  },
});
