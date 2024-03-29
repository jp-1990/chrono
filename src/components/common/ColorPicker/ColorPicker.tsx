import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { colors } from "../../../styles";

export interface Display {
  setColorPickerActive: React.Dispatch<React.SetStateAction<boolean>>;
  colorPickerActive: boolean;
}

interface PressableColorSquareProps {
  color: string;
  setColor: (color: string) => void;
  setColorPickerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const PressableColorSquare: React.FC<PressableColorSquareProps> = ({
  color,
  setColor,
  setColorPickerActive,
}) => {
  return (
    <View>
      <Pressable
        style={{
          ...styles.colorBox,
          backgroundColor: color.toLowerCase(),
        }}
        android_ripple={{
          color: colors.backgroundColor,
          borderless: false,
          radius: 150,
        }}
        onPress={() => {
          setColorPickerActive((prev) => !prev);
          setColor(color.toLowerCase());
        }}
      ></Pressable>
    </View>
  );
};

interface Props {
  color: string;
  setColor: (color: string) => void;
  display: Display;
}

// provides a color picker which supports 21 colors
const ColorPicker: React.FC<Props> = ({ color, setColor, display }) => {
  const colorSelection = [
    "rgb(229, 229, 229)",
    "rgb(126, 126, 126)",
    "rgb(50, 50, 50)",
    "rgb(0, 0, 0)",
    "rgb(0, 63, 6)",
    "rgb(0, 118, 19)",
    "rgb(4, 218, 0)",
    "rgb(255, 214, 0)",
    "rgb(255, 86, 0)",
    "rgb(177, 64, 0)",
    "rgb(86, 26, 0)",
    "rgb(2, 0, 80)",
    "rgb(0, 22, 218)",
    "rgb(38, 203, 255)",
    "rgb(255, 0, 199)",
    "rgb(192, 0, 150)",
    "rgb(234, 0, 0)",
    "rgb(126, 0, 0)",
    "rgb(75, 0, 111)",
    "rgb(155, 0, 250)",
    "rgb(0, 94, 115)",
  ];
  const row1 = [];
  const row2 = [];
  const row3 = [];

  for (let i = 0, j = colorSelection.length; i < j; i++) {
    if (i < 7) {
      row1.push(
        <PressableColorSquare
          key={colorSelection[i]}
          color={colorSelection[i]}
          setColor={setColor}
          setColorPickerActive={display.setColorPickerActive}
        />
      );
    } else if (i < 14) {
      row2.push(
        <PressableColorSquare
          key={colorSelection[i]}
          color={colorSelection[i]}
          setColor={setColor}
          setColorPickerActive={display.setColorPickerActive}
        />
      );
    } else if (i <= 21) {
      row3.push(
        <PressableColorSquare
          key={colorSelection[i]}
          color={colorSelection[i]}
          setColor={setColor}
          setColorPickerActive={display.setColorPickerActive}
        />
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
              color: "rgba(126, 126, 126, 1)",
              borderless: false,
              radius: 150,
            }}
            onPress={() => display.setColorPickerActive((prev) => !prev)}
            style={{ ...styles.selectedColor, backgroundColor: color }}
          />
        </View>
      </View>
      {display.colorPickerActive ? (
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
    fontSize: 24,
    color: colors.headingPrimary,
    paddingHorizontal: 10,
    textTransform: "uppercase",
  },
  selectedColor: {
    marginHorizontal: 10,
    height: 36,
    width: 36,
    borderRadius: 2,
  },
  pickerVisible: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 120,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: 300,
    minWidth: 300,
  },
  colorBox: {
    height: 36,
    width: 36,
    borderWidth: 0.5,
    borderColor: colors.headingSecondary,
    borderRadius: 2,
  },
});
