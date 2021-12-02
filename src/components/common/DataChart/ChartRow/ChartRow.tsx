import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DataBar from "./DataBar";

import { colors } from "../../../../styles";
import { TaskDataWithMarginAndWidth } from "../../../../types/data";

interface Props {
  date: number;
  data: TaskDataWithMarginAndWidth[] | undefined;
  setSelectedTask: React.Dispatch<
    React.SetStateAction<TaskDataWithMarginAndWidth | undefined>
  >;
}

const ChartRow: React.FC<Props> = ({ date, data, setSelectedTask }) => {
  // create array of databars to render in row
  const renderedBars = data?.map((el, i) => {
    const handleOnPress = () => {
      setSelectedTask(el);
    };
    return <DataBar key={i} data={el} onPress={handleOnPress} />;
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
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 20,
    flex: 1,
  },
  dataBars: {
    height: 22,
    flexDirection: "row",
    flex: 1,
  },
});
