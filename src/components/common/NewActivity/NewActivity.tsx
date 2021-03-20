import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FormInputs from "../FormInputs/FormInputs";
import ColorPicker, {
  Display as DisplayColorPickerProps,
} from "../ColorPicker/ColorPicker";
import MainButton from "../MainButton/MainButton";

import { base } from "../../../styles";
const { colors } = base;
const { defaultInput } = base;

interface DateTimePickerTypes {
  mode: "date" | "time" | "datetime" | "countdown" | undefined;
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
  close(): void;
  colorPicker: DisplayColorPickerProps;
}

const NewActivity: React.FC<Props> = ({ onSubmit, close, colorPicker }) => {
  const [date, setDate] = useState<DateTimePickerTypes["dateObject"]>({
    now: new Date(Date.now()),
  });
  const [color, setColor] = useState(colors.menuPrimary);
  const [mode, setMode] = useState<DateTimePickerTypes["mode"]>("date");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<DateTimePickerTypes["target"]>(
    "startTime"
  );

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

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.close}></View>
          <Text style={styles.headerText}>New Activity</Text>
        </View>
        <View style={styles.formContainer}>
          <FormInputs inputLabels={["Activity", "Category", "Notes"]} />
          <View style={styles.dateTimeContainer}>
            <View>
              <Pressable onPress={() => showDatepicker("startDate")}>
                <View style={{ ...defaultInput, ...styles.dateTime }}>
                  <Text style={styles.dateTimeText}>
                    {date.startDate !== undefined
                      ? ukDate(date.startDate)
                      : "Start date"}
                  </Text>
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={22}
                    color={colors.headingPrimary}
                  />
                </View>
              </Pressable>
              <Pressable onPress={() => showDatepicker("endDate")}>
                <View style={{ ...defaultInput, ...styles.dateTime }}>
                  <Text style={styles.dateTimeText}>
                    {date.endDate !== undefined
                      ? ukDate(date.endDate)
                      : "End date"}
                  </Text>
                  <MaterialCommunityIcons
                    name="calendar-remove"
                    size={22}
                    color={colors.headingPrimary}
                  />
                </View>
              </Pressable>
            </View>
            <View>
              <Pressable onPress={() => showTimepicker("startTime")}>
                <View style={{ ...defaultInput, ...styles.dateTime }}>
                  <Text style={styles.dateTimeText}>
                    {date.startTime !== undefined
                      ? date.startTime.toLocaleTimeString().substring(0, 5)
                      : "Start time"}
                  </Text>
                  <MaterialIcons
                    name="more-time"
                    size={22}
                    color={colors.headingPrimary}
                  />
                </View>
              </Pressable>
              <Pressable onPress={() => showTimepicker("endTime")}>
                <View style={{ ...defaultInput, ...styles.dateTime }}>
                  <Text style={styles.dateTimeText}>
                    {date.endTime !== undefined
                      ? date.endTime.toLocaleTimeString().substring(0, 5)
                      : "End time"}
                  </Text>
                  <MaterialIcons
                    name="timer-off"
                    size={22}
                    color={colors.headingPrimary}
                  />
                </View>
              </Pressable>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date.now}
                mode={mode}
                // @ts-expect-error something within DateTimePicker types
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <ColorPicker color={color} setColor={setColor} display={colorPicker} />
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
    </View>
  );
};

export default NewActivity;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBackground,
  },
  container: {
    backgroundColor: colors.newActivityBackground,
    width: "90%",
    height: "80%",
    borderWidth: 0.5,
    borderColor: colors.headingSecondary,
    alignItems: "center",
  },
  header: {
    backgroundColor: colors.menuSecondary,
    position: "relative",
    height: 66,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  close: {
    position: "absolute",
  },
  headerText: {
    color: colors.buttonText,
    fontSize: 30,
    fontFamily: "lato-light",
  },
  formContainer: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 130,
  },
  dateTimeText: {
    fontSize: 18,
    color: colors.menuSecondary,
    fontFamily: "lato-light",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
  },
});
