import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

import { Text } from "../Text";
import ColorPicker from "../ColorPicker/ColorPicker";
import MainButton from "../MainButton/MainButton";

import { useCreateTask, SubmitVariables } from "../../../hooks";

import { base, colors } from "../../../styles";
import { buildDateTime } from "../../../utils";
const { defaultInput } = base;

const targetTypes = ["startDate", "startTime", "endDate", "endTime"] as const;
interface DateTimePickerTypes {
  mode: "date" | "time" | undefined;
  target: typeof targetTypes[number];
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
  const { state, actions } = useCreateTask();

  const activityRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  const focusActivity = () => activityRef?.current?.focus();
  const focusNotes = () => notesRef?.current?.focus();

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [colorPickerActive, setColorPickerActive] = useState(false);
  const [mode, setMode] = useState<DateTimePickerTypes["mode"]>("date");
  const [show, setShow] = useState(false);
  const [target, setTarget] =
    useState<DateTimePickerTypes["target"]>("startTime");

  useEffect(() => {
    actions.resetState();
    setColorPickerActive(false);
    setValidationErrors([]);
  }, [modalActive]);

  const handleSubmit = () => {
    const validationErrorFields = actions.validate(state).map(({ key }) => key);
    setValidationErrors(validationErrorFields);
    if (validationErrorFields.length > 0) return;

    const start = buildDateTime(state.startDate, state.startTime);
    const end = buildDateTime(state.endDate, state.endTime);
    if (!start || !end) return;

    const variables: SubmitVariables = {
      title: state.title,
      activity: state.activity,
      notes: state.notes,
      colour: state.color,
      start,
      end,
    };
    console.log(variables);

    actions.submit(variables);
  };

  const onTitleChange = (title: string) => {
    setValidationErrors((prev) => prev.filter((el) => el !== "title"));
    actions.setTitle(title);
  };
  const onActivityChange = (activity: string) => {
    setValidationErrors((prev) => prev.filter((el) => el !== "activity"));
    actions.setActivity(activity);
  };

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setShow(false);
    const action = `set${target[0].toUpperCase()}${target.slice(
      1
    )}` as keyof Pick<
      typeof actions,
      "setStartDate" | "setStartTime" | "setEndDate" | "setEndTime"
    >;
    actions[action](selectedDate);
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
      setValidationErrors((prev) => prev.filter((el) => el !== label));
      if (label.includes("Date")) showDatepicker(label);
      if (label.includes("Time")) showTimepicker(label);
    };

    let text;
    if (state[label]) {
      if (label.includes("Date"))
        text = moment(state[label]).format("DD/MM/YYYY");
      if (label.includes("Time")) text = moment(state[label]).format("HH:mm");
    }

    return (
      <Pressable onPress={onPress}>
        <View
          style={[
            defaultInput,
            styles.dateTime,
            validationErrors.includes(label) ? styles.inputError : null,
          ]}
        >
          {state[label] ? (
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
            onChangeText={onTitleChange}
            placeholder={"Title"}
            placeholderTextColor={colors.headingSecondary}
            style={[
              defaultInput,
              validationErrors.includes("title") ? styles.inputError : null,
            ]}
            returnKeyType="next"
            onSubmitEditing={focusActivity}
            blurOnSubmit={false}
          />
          <TextInput
            ref={activityRef}
            value={state.activity}
            onChangeText={onActivityChange}
            placeholder={"Activity"}
            placeholderTextColor={colors.headingSecondary}
            style={[
              defaultInput,
              validationErrors.includes("activity") ? styles.inputError : null,
            ]}
            returnKeyType="next"
            onSubmitEditing={focusNotes}
            blurOnSubmit={false}
          />
          <TextInput
            ref={notesRef}
            value={state.notes}
            onChangeText={actions.setNotes}
            placeholder={"Notes"}
            placeholderTextColor={colors.headingSecondary}
            style={defaultInput}
            returnKeyType="next"
          />
        </View>
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
  inputError: { borderColor: "red", borderWidth: 1 },
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
