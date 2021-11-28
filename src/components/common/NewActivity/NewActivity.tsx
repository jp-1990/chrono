import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import { FormInputs } from "../FormInputs";
import ColorPicker from "../ColorPicker/ColorPicker";
import MainButton from "../MainButton/MainButton";

import { Text } from "../Text";

import { base, colors } from "../../../styles";
const { defaultInput } = base;

interface DateTimePickerTypes {
  mode: "date" | "time" | undefined;
  target: "startTime" | "endTime" | "startDate" | "endDate";
  dateObject: {
    now: Date;
    startTime?: Date;
    endTime?: Date;
    startDate?: Date;
    endDate?: Date;
  };
}

interface Props {
  onSubmit(): void;
}

const NewActivity: React.FC<Props> = ({ onSubmit }) => {
  const [colorPickerActive, setColorPickerActive] = useState(false);
  const [values, setValues] = useState<{ [key: string]: string }>({
    Title: "",
    Activity: "",
    Notes: "",
  });

  const [date, setDate] = useState<DateTimePickerTypes["dateObject"]>({
    now: new Date(Date.now()),
  });
  const [color, setColor] = useState(colors.menuPrimary);
  const [mode, setMode] = useState<DateTimePickerTypes["mode"]>("date");
  const [show, setShow] = useState(false);
  const [target, setTarget] =
    useState<DateTimePickerTypes["target"]>("startTime");

  //export to utils?
  const ukDate = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month =
      dateObj.getMonth() + 1 < 10
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1;
    const date =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    return `${date}/${month}/${year.toString().substring(0, 2)}`;
  };

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || undefined;
    setShow(false);
    setDate((prev) => {
      return { ...prev, [target]: currentDate };
    });
  };

  const showMode = (currentMode: DateTimePickerTypes["mode"]) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (target: DateTimePickerTypes["target"]) => {
    setTarget(target);
    showMode("date");
  };

  const showTimepicker = (target: DateTimePickerTypes["target"]) => {
    setTarget(target);
    showMode("time");
  };

  interface DateTimeInputProps {
    label: DateTimePickerTypes["target"];
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    placeholder: string;
  }
  const DateTimeInput: React.FC<DateTimeInputProps> = ({
    label,
    icon,
    placeholder,
  }) => {
    const onPress = () => {
      if (label.includes("Date")) showDatepicker(label);
      if (label.includes("Time")) showTimepicker(label);
    };

    let text;
    if (date[label]) {
      if (label.includes("Date"))
        text = moment(date[label]).format("DD/MM/YYYY");
      if (label.includes("Time")) text = moment(date[label]).format("HH:mm");
    }
    return (
      <Pressable onPress={onPress}>
        <View style={{ ...defaultInput, ...styles.dateTime }}>
          {date[label] ? (
            <Text variant="sp" style={styles.dateTimeText}>
              {text}
            </Text>
          ) : (
            <Text variant="sp" style={styles.placeholder}>
              {placeholder}
            </Text>
          )}
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.headingPrimary}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.headerText}>
          New Activity
        </Text>
        <Text variant="sp">
          Statistics will group by 'Activity', and then by 'Title'
        </Text>
      </View>
      <View style={styles.formContainer}>
        <FormInputs
          inputLabels={["Title", "Activity", "Notes"]}
          values={values}
          setValues={setValues}
        />

        <View style={styles.dateTimeContainer}>
          <View>
            <DateTimeInput
              label="startDate"
              icon="calendar-range"
              placeholder="Start date"
            />
            <DateTimeInput
              label="endDate"
              icon="calendar-range"
              placeholder="End date"
            />
          </View>
          <View>
            <DateTimeInput
              label="startTime"
              icon="timer-outline"
              placeholder="Start time"
            />
            <DateTimeInput
              label="endTime"
              icon="timer-off-outline"
              placeholder="End time"
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date.now}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <ColorPicker
        color={color}
        setColor={setColor}
        display={{ setColorPickerActive, colorPickerActive }}
      />
      <View style={styles.buttonContainer}>
        <MainButton
          label="Create"
          width="50%"
          colorBG={colors.buttonPrimary}
          colorText={colors.buttonText}
          ripple={colors.buttonPrimaryRipple}
          marginTop={24}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default NewActivity;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 36,
    height: 464,
  },
  header: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  headerText: {
    marginBottom: 8,
  },
  formContainer: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    width: 250,
    justifyContent: "center",
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 120,
  },
  dateTimeText: {
    color: colors.headingPrimary,
  },
  placeholder: {
    color: colors.headingSecondary,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
  },
});
