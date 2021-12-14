import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { Text } from '../Text';
import { base, colors } from '../../../styles';
const { defaultInput } = base;

export const targetTypes = [
  'startDate',
  'startTime',
  'endDate',
  'endTime',
] as const;
export interface DateTimePickerTypes {
  mode: 'date' | 'time' | undefined;
  target: typeof targetTypes[number];
  dateObject: {
    now: Date;
    startDate?: Date;
    endDate?: Date;
  };
}

interface DateTimeInputProps {
  label: DateTimePickerTypes['target'];
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  currentValue: Date | undefined;
  showPicker: (label: DateTimePickerTypes['target']) => void;
  validationErrors?: string[];
  setValidationErrors?: React.Dispatch<React.SetStateAction<string[]>>;
}
const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  icon,
  placeholder,
  currentValue,
  showPicker,
  validationErrors,
  setValidationErrors,
}) => {
  const onPress = () => {
    if (setValidationErrors) {
      setValidationErrors((prev) => prev.filter((el) => el !== label));
    }
    showPicker(label);
  };

  let text;
  if (currentValue) {
    if (label.includes('Date'))
      text = moment(currentValue).format('DD/MM/YYYY');
    if (label.includes('Time')) text = moment(currentValue).format('HH:mm');
  }

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          defaultInput,
          styles.dateTime,
          validationErrors?.includes(label) ? styles.inputError : null,
        ]}
      >
        {currentValue ? (
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

export default DateTimeInput;

const styles = StyleSheet.create({
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
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
