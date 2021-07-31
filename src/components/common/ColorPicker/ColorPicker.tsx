import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { colors } from "../../../styles";

export interface Display {
  setColorPickerVisible(): void;
  colorPickerVisible: boolean;
}

interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  display: Display;
}

// provides a color picker which supports 21 colors
const ColorPicker: React.FC<Props> = ({ color, setColor, display }) => {
  const colorSelection = [
    "navy",
    "steelblue",
    "Blue",
    "DarkBlue",
    "Cyan",
    "Crimson",
    "DarkRed",
    "IndianRed",
    "Chartreuse",
    "DarkGreen",
    "DarkOliveGreen",
    "DarkViolet",
    "DeepPink",
    "Indigo",
    "Orange",
    "Yellow",
    "Gold",
    "Black",
    "DarkGrey",
    "Grey",
    "SaddleBrown",
  ];
  const row1 = [];
  const row2 = [];
  const row3 = [];

  for (let i = 0, j = colorSelection.length; i < j; i++) {
    if (i < 7) {
      row1.push(
        <View key={i}>
          <Pressable
            style={{
              ...styles.colorBox,
              backgroundColor: colorSelection[i].toLowerCase(),
            }}
            android_ripple={{
              color: colors.menuSecondary,
              borderless: false,
              radius: 150,
            }}
            onPress={() => {
              display.setColorPickerVisible();
              setColor(colorSelection[i].toLowerCase());
            }}
          ></Pressable>
        </View>
      );
    } else if (i < 14) {
      row2.push(
        <View key={i}>
          <Pressable
            style={{
              ...styles.colorBox,
              backgroundColor: colorSelection[i].toLowerCase(),
            }}
            android_ripple={{
              color: colors.menuSecondary,
              borderless: false,
              radius: 150,
            }}
            onPress={() => {
              display.setColorPickerVisible();
              setColor(colorSelection[i].toLowerCase());
            }}
          ></Pressable>
        </View>
      );
    } else if (i <= 21) {
      row3.push(
        <View key={i}>
          <Pressable
            style={{
              ...styles.colorBox,
              backgroundColor: colorSelection[i].toLowerCase(),
            }}
            android_ripple={{
              color: colors.menuSecondary,
              borderless: false,
              radius: 150,
            }}
            onPress={() => {
              display.setColorPickerVisible();
              setColor(colorSelection[i].toLowerCase());
            }}
          ></Pressable>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerHidden}>
        <Text style={styles.text}>color</Text>
        <View>
          <Pressable
            android_ripple={{
              color: colors.menuSecondary,
              borderless: false,
              radius: 150,
            }}
            onPress={() => display.setColorPickerVisible()}
            style={{ ...styles.selectedColor, backgroundColor: color }}
          ></Pressable>
        </View>
      </View>
      {display.colorPickerVisible ? (
        <View style={styles.pickerVisible}>
          <View style={styles.row}>{row1}</View>
          <View style={styles.row}>{row2}</View>
          <View style={styles.row}>{row3}</View>
        </View>
      ) : null}
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  pickerHidden: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "lato-light",
    fontSize: 30,
    color: colors.headingPrimary,
    paddingHorizontal: 10,
    textTransform: "uppercase",
  },
  selectedColor: {
    marginHorizontal: 10,
    height: 36,
    width: 36,
  },
  pickerVisible: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 120,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: colors.newActivityBackground,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  colorBox: {
    height: 36,
    width: 36,
    borderWidth: 0.5,
    borderColor: colors.headingSecondary,
  },
});
