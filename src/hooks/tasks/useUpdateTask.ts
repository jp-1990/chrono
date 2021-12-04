import { useReducer } from 'react';
import { useMutation } from '@apollo/client';

import {
  UpdateTaskMutation,
  UpdateTaskMutationArgs,
  UpdateTaskMutationRes,
  UpdateTasksColourAndGroupMutation,
  UpdateTasksColourAndGroupArgs,
  UpdateTasksColourAndGroupRes,
} from '../../graphql/mutations';
import {
  buildDateTime,
  inputValidation,
  percentageTimeSinceMidnight,
} from '../../utils';
const { isDefined, isValidDateOrder, isValidCharLength } = inputValidation;

enum Actions {
  SET_TITLE = 'SET_TITLE',
  SET_ACTIVITY = 'SET_ACTIVITY',
  SET_NOTES = 'SET_NOTES',
  SET_COLOR = 'SET_COLOR',
  SET_START_DATE = 'SET_START_DATE',
  SET_START_TIME = 'SET_START_TIME',
  SET_END_DATE = 'SET_END_DATE',
  SET_END_TIME = 'SET_END_TIME',
  SET_STATE = 'SET_STATE',
  RESET_STATE = 'RESET_STATE',
}
type ActionType =
  | {
      type:
        | Actions.SET_TITLE
        | Actions.SET_ACTIVITY
        | Actions.SET_NOTES
        | Actions.SET_COLOR;
      payload: string;
    }
  | {
      type:
        | Actions.SET_START_DATE
        | Actions.SET_START_TIME
        | Actions.SET_END_DATE
        | Actions.SET_END_TIME;
      payload: Date;
    }
  | {
      type: Actions.SET_STATE;
      payload: Partial<StateType>;
    }
  | { type: Actions.RESET_STATE };
type StateType = {
  title: string;
  activity: string;
  notes: string;
  color: string;
  startDate: Date | undefined;
  startTime: Date | undefined;
  endDate: Date | undefined;
  endTime: Date | undefined;
};

const initialState = {
  title: '',
  activity: '',
  notes: '',
  startDate: undefined,
  startTime: undefined,
  endDate: undefined,
  endTime: undefined,
  color: 'rgba(126, 126, 126, 1)',
};

const updateTaskReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.SET_TITLE:
      return { ...state, title: action.payload };

    case Actions.SET_ACTIVITY:
      return { ...state, activity: action.payload };

    case Actions.SET_NOTES:
      return { ...state, notes: action.payload };

    case Actions.SET_COLOR:
      return { ...state, color: action.payload };

    case Actions.SET_START_DATE:
      return { ...state, startDate: action.payload };

    case Actions.SET_START_TIME:
      return { ...state, startTime: action.payload };

    case Actions.SET_END_DATE:
      return { ...state, endDate: action.payload };

    case Actions.SET_END_TIME:
      return { ...state, endTime: action.payload };

    case Actions.SET_STATE:
      return { ...state, ...action.payload };

    case Actions.RESET_STATE:
      return initialState;
    default:
      throw new Error(`unhandled action: ${action}`);
  }
};

const useUpdateTask = (task: StateType, taskId: string) => {
  const [state, dispatch] = useReducer(updateTaskReducer, task);

  const [updateTaskMutation] = useMutation<
    UpdateTaskMutationRes,
    UpdateTaskMutationArgs
  >(UpdateTaskMutation, {
    onError: (err) => console.error(err),
  });

  const [updateTasksColourAndGroup] = useMutation<
    UpdateTasksColourAndGroupRes,
    UpdateTasksColourAndGroupArgs
  >(UpdateTasksColourAndGroupMutation, {
    onError: (err) => console.error(err),
  });

  const actions = {
    setTitle: (title: string) =>
      dispatch({ type: Actions.SET_TITLE, payload: title }),
    setActivity: (activity: string) =>
      dispatch({ type: Actions.SET_ACTIVITY, payload: activity }),
    setNotes: (notes: string) =>
      dispatch({ type: Actions.SET_NOTES, payload: notes }),
    setColor: (color: string) =>
      dispatch({ type: Actions.SET_COLOR, payload: color }),
    setStartDate: (startDate: Date) =>
      dispatch({ type: Actions.SET_START_DATE, payload: startDate }),
    setStartTime: (startTime: Date) =>
      dispatch({ type: Actions.SET_START_TIME, payload: startTime }),
    setEndDate: (endDate: Date) =>
      dispatch({ type: Actions.SET_END_DATE, payload: endDate }),
    setEndTime: (endTime: Date) =>
      dispatch({ type: Actions.SET_END_TIME, payload: endTime }),
    setState: (payload: Partial<StateType>) =>
      dispatch({ type: Actions.SET_STATE, payload }),
    resetState: () => dispatch({ type: Actions.RESET_STATE }),
    validate: (input: StateType) => {
      const validationErrors = [];
      for (const key of Object.keys(input) as (keyof typeof input)[]) {
        if (key === 'title' && !isValidCharLength(input[key], 50))
          validationErrors.push({ key, error: 'LENGTH' });
        if (
          (key === 'activity' || key === 'notes') &&
          !isValidCharLength(input[key], 255)
        )
          validationErrors.push({ key, error: 'LENGTH' });
        if (key === 'notes' || key === 'color') continue;
        if (!isDefined([input[key]]))
          validationErrors.push({ key, error: 'UNDEFINED' });
      }
      const start = buildDateTime(input.startDate, input.startTime);
      const end = buildDateTime(input.endDate, input.endTime);
      if (!isValidDateOrder(start, end)) {
        validationErrors.push({ key: 'endDate', error: 'DATE_ORDER' });
        validationErrors.push({ key: 'endTime', error: 'DATE_ORDER' });
      }
      return validationErrors;
    },
    submit: (variables: {
      updateTask: UpdateTaskMutationArgs;
      updateColourAndGroup: UpdateTasksColourAndGroupArgs;
    }) => {
      updateTaskMutation({
        variables: variables.updateTask,
        optimisticResponse: {
          updateTask: {
            __typename: 'Task',
            id: taskId,
            title: state.title,
            description: state.notes,
            start: `${buildDateTime(
              state.startDate,
              state.startTime
            )?.valueOf()}`,
            end: `${buildDateTime(state.endDate, state.endTime)?.valueOf()}`,
            percentageTimes: {
              startPercentage: percentageTimeSinceMidnight(
                buildDateTime(state.startDate, state.startTime) || new Date()
              ),
              endPercentage: percentageTimeSinceMidnight(
                buildDateTime(state.endDate, state.endTime) || new Date()
              ),
            },
          },
        },
      });

      if (
        variables.updateColourAndGroup.activity !== task.activity ||
        variables.updateColourAndGroup.colour !== task.color
      ) {
        updateTasksColourAndGroup({
          variables: variables.updateColourAndGroup,
        });
      }
    },
  };

  return {
    state,
    actions,
  };
};

export default useUpdateTask;
export type UpdateVariables = {
  updateTask: UpdateTaskMutationArgs;
  updateColourAndGroup: UpdateTasksColourAndGroupArgs;
};
