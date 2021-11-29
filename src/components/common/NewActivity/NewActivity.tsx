import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import { Text } from "../Text";
import ColorPicker from "../ColorPicker/ColorPicker";
import MainButton from "../MainButton/MainButton";

import { useNewActivity } from "../../../hooks";

import { base, colors } from "../../../styles";
const { defaultInput } = base;

const targetTypes = [
  "setStartDate",
  "setStartTime",
  "setEndDate",
  "setEndTime",
] as const;
interface DateTimePickerTypes {
  mode: "date" | "time" | undefined;
  target: "setStartTime" | "setEndTime" | "setStartDate" | "setEndDate";
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
  modalActive: boolean;
}
const NewActivity: React.FC<Props> = ({ modalActive }) => {
  const { state, actions } = useNewActivity();

  const [colorPickerActive, setColorPickerActive] = useState(false);
  const [dateTimeSelected, setDateTimeSelected] = useState<
    DateTimePickerTypes["target"][]
  >([]);
  const [mode, setMode] = useState<DateTimePickerTypes["mode"]>("date");
  const [show, setShow] = useState(false);
  const [target, setTarget] =
    useState<DateTimePickerTypes["target"]>("setStartTime");

  useEffect(() => {
    actions.resetState();
    setColorPickerActive(false);
    setDateTimeSelected([]);
  }, [modalActive]);

  const handleSubmit = () => {
    const validationErrors = actions.validate(state);
    const unselectedDateTime = targetTypes.filter(
      (el) => !dateTimeSelected.includes(el)
    );
    console.log({ state, validationErrors, unselectedDateTime });
  };

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setShow(false);
    setDateTimeSelected((prev) => [...new Set([...prev, target])]);
    actions[target](selectedDate);
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
    const when = label.includes("Start") ? "start" : "end";

    let text;
    if (state[when]) {
      if (label.includes("Date") && dateTimeSelected.includes(label))
        text = moment(state[when]).format("DD/MM/YYYY");
      if (label.includes("Time") && dateTimeSelected.includes(label))
        text = moment(state[when]).format("HH:mm");
    }

    return (
      <Pressable onPress={onPress}>
        <View style={{ ...defaultInput, ...styles.dateTime }}>
          {state[when] && dateTimeSelected.includes(label) ? (
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
        <View style={styles.inputContainer}>
          <TextInput
            value={state.title}
            onChangeText={actions.setTitle}
            placeholder={"Title"}
            placeholderTextColor={colors.headingSecondary}
            style={defaultInput}
            returnKeyType="next"
          />
          <TextInput
            value={state.activity}
            onChangeText={actions.setActivity}
            placeholder={"Activity"}
            placeholderTextColor={colors.headingSecondary}
            style={defaultInput}
            returnKeyType="next"
          />
          <TextInput
            value={state.notes}
            onChangeText={actions.setNotes}
            placeholder={"Notes"}
            placeholderTextColor={colors.headingSecondary}
            style={defaultInput}
          />
        </View>
        <View style={styles.dateTimeContainer}>
          <View>
            <DateTimeInput
              label="setStartDate"
              icon="calendar-range"
              placeholder="Start date"
            />
            <DateTimeInput
              label="setEndDate"
              icon="calendar-range"
              placeholder="End date"
            />
          </View>
          <View>
            <DateTimeInput
              label="setStartTime"
              icon="timer-outline"
              placeholder="Start time"
            />
            <DateTimeInput
              label="setEndTime"
              icon="timer-off-outline"
              placeholder="End time"
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(Date.now())}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <ColorPicker
        color={state.color}
        setColor={actions.setColor}
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
          onPress={handleSubmit}
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
  inputContainer: { alignItems: "center", width: "100%" },
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
