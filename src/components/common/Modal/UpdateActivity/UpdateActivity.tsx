import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Text } from '../../Text';
import ColorPicker from '../../ColorPicker/ColorPicker';
import MainButton from '../../MainButton/MainButton';
import { DateTimeInput } from '../../DateTimeInput';

import {
  useDeleteTask,
  useUpdateTask,
  UpdateVariables,
} from '../../../../hooks';

import { base, colors } from '../../../../styles';
import { buildDateTime, calcLuminance } from '../../../../utils';
import { TaskDataWithMarginAndWidth } from '../../../../types';
const { defaultInput } = base;

const targetTypes = ['startDate', 'startTime', 'endDate', 'endTime'] as const;
interface DateTimePickerTypes {
  mode: 'date' | 'time' | undefined;
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
  closeModal(): void;
  modalActive: boolean;
  selectedTask: TaskDataWithMarginAndWidth | null;
}
const UpdateActivity: React.FC<Props> = ({
  modalActive,
  closeModal,
  selectedTask,
}) => {
  const task = {
    title: selectedTask?.title || '',
    activity: selectedTask?.group || '',
    notes: selectedTask?.description || '',
    startDate: new Date(selectedTask?.start || Date.now()),
    startTime: new Date(selectedTask?.start || Date.now()),
    endDate: new Date(selectedTask?.end || Date.now()),
    endTime: new Date(selectedTask?.end || Date.now()),
    color: selectedTask?.color || 'rgba(126, 126, 126, 1)',
  };
  const { state, actions } = useUpdateTask(task, selectedTask?.id || '');
  const { deleteTask } = useDeleteTask();

  const activityRef = useRef<TextInput>(null);
  const notesRef = useRef<TextInput>(null);

  const focusActivity = () => activityRef?.current?.focus();
  const focusNotes = () => notesRef?.current?.focus();

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [colorPickerActive, setColorPickerActive] = useState(false);
  const [mode, setMode] = useState<DateTimePickerTypes['mode']>('date');
  const [show, setShow] = useState(false);
  const [target, setTarget] =
    useState<DateTimePickerTypes['target']>('startTime');

  useEffect(() => {
    if (!modalActive) {
      actions.resetState();
      setColorPickerActive(false);
      setValidationErrors([]);
    }
  }, [modalActive, actions]);

  const handleSubmit = async () => {
    const validationErrorFields = actions.validate(state).map(({ key }) => key);
    setValidationErrors(validationErrorFields);
    if (validationErrorFields.length > 0) return;
    const start = buildDateTime(state.startDate, state.startTime);
    const end = buildDateTime(state.endDate, state.endTime);
    if (!start || !end) return;
    const variables: UpdateVariables = {
      updateTask: {
        id: selectedTask?.id || '',
        title: state.title,
        notes: state.notes,
        start: `${start.valueOf()}`,
        end: `${end.valueOf()}`,
      },
      updateColourAndGroup: {
        title: state.title,
        activity: state.activity,
        colour: state.color,
      },
    };
    await actions.submit(variables);
    closeModal();
  };

  const handleDelete = async () => {
    await deleteTask(selectedTask?.id);
    closeModal();
  };

  const onTitleChange = (title: string) => {
    setValidationErrors((prev) => prev.filter((el) => el !== 'title'));
    actions.setTitle(title);
  };
  const onActivityChange = (activity: string) => {
    setValidationErrors((prev) => prev.filter((el) => el !== 'activity'));
    actions.setActivity(activity);
  };

  const onChange = (_: Event, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setShow(false);
      return;
    }
    setShow(false);
    const action = `set${target[0].toUpperCase()}${target.slice(
      1
    )}` as keyof Pick<
      typeof actions,
      'setStartDate' | 'setStartTime' | 'setEndDate' | 'setEndTime'
    >;
    actions[action](selectedDate);
  };

  const showPicker = (label: DateTimePickerTypes['target']) => {
    if (label.includes('Date')) {
      setTarget(label);
      setMode('date');
      setShow(true);
    }
    if (label.includes('Time')) {
      setTarget(label);
      setMode('time');
      setShow(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.headerText}>
          Update Activity
        </Text>
        <Text variant="sp">
          Statistics will group by &apos;Activity&apos;, and then by
          &apos;Title&apos;
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={state.title}
            onChangeText={onTitleChange}
            placeholder={'Title'}
            placeholderTextColor={colors.headingSecondary}
            style={[
              defaultInput,
              validationErrors.includes('title') ? styles.inputError : null,
            ]}
            returnKeyType="next"
            onSubmitEditing={focusActivity}
            blurOnSubmit={false}
          />
          <TextInput
            ref={activityRef}
            value={state.activity}
            onChangeText={onActivityChange}
            placeholder={'Activity'}
            placeholderTextColor={colors.headingSecondary}
            style={[
              defaultInput,
              validationErrors.includes('activity') ? styles.inputError : null,
            ]}
            returnKeyType="next"
            onSubmitEditing={focusNotes}
            blurOnSubmit={false}
          />
          <TextInput
            ref={notesRef}
            value={state.notes}
            onChangeText={actions.setNotes}
            placeholder={'Notes'}
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
              showPicker={showPicker}
              currentValue={state.startDate}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
            <DateTimeInput
              label="endDate"
              icon="calendar-range"
              placeholder="End date"
              showPicker={showPicker}
              currentValue={state.endDate}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
          </View>
          <View>
            <DateTimeInput
              label="startTime"
              icon="timer-outline"
              placeholder="Start time"
              showPicker={showPicker}
              currentValue={state.startTime}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
            <DateTimeInput
              label="endTime"
              icon="timer-off-outline"
              placeholder="End time"
              showPicker={showPicker}
              currentValue={state.endTime}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                (target.includes('start')
                  ? buildDateTime(state.startDate, state.startTime)
                  : buildDateTime(state.endDate, state.endTime)) ||
                new Date(Date.now())
              }
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
          label="Delete"
          width="35%"
          colorBG={colors.menuSecondary}
          colorText={colors.buttonText}
          ripple={colors.buttonPrimaryRipple}
          marginTop={24}
          onPress={handleDelete}
        />
        <View style={styles.spacer} />
        <MainButton
          label="Update"
          width="35%"
          colorBG={state.color}
          colorText={
            calcLuminance(state.color) < 0.5
              ? colors.buttonText
              : colors.textDark
          }
          ripple={colors.buttonPrimaryRipple}
          marginTop={24}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default UpdateActivity;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 36,
    height: 464,
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  headerText: {
    marginBottom: 8,
  },
  formContainer: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: { alignItems: 'center', width: '100%' },
  inputError: { borderColor: 'red', borderWidth: 1 },
  dateTimeContainer: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'center',
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  spacer: {
    width: 15,
  },
});
