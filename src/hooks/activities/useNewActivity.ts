import React, { useReducer } from "react";
import { useMutation } from "@apollo/client";

import { buildDateTime, inputValidation } from "../../utils";
const { isDefined, isValidDateOrder, isValidCharLength } = inputValidation;

enum Actions {
  SET_TITLE = "SET_TITLE",
  SET_ACTIVITY = "SET_ACTIVITY",
  SET_NOTES = "SET_NOTES",
  SET_COLOR = "SET_COLOR",
  SET_START_DATE = "SET_START_DATE",
  SET_START_TIME = "SET_START_TIME",
  SET_END_DATE = "SET_END_DATE",
  SET_END_TIME = "SET_END_TIME",
  RESET_STATE = "RESET_STATE",
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
  | { type: Actions.RESET_STATE };
type StateType = {
  title: string;
  activity: string;
  notes: string;
  color: string;
  start: Date | undefined;
  end: Date | undefined;
};

const initialState = {
  title: "",
  activity: "",
  notes: "",
  start: undefined,
  end: undefined,
  color: "rgba(126, 126, 126, 1)",
};

const newActivityReducer = (state: StateType, action: ActionType) => {
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
      if (state.start)
        return { ...state, start: buildDateTime(action.payload, state.start) };
      return { ...state, start: action.payload };

    case Actions.SET_START_TIME:
      if (state.start)
        return { ...state, start: buildDateTime(state.start, action.payload) };
      return { ...state, start: action.payload };

    case Actions.SET_END_DATE:
      if (state.end)
        return { ...state, end: buildDateTime(action.payload, state.end) };
      return { ...state, end: action.payload };

    case Actions.SET_END_TIME:
      if (state.end)
        return { ...state, end: buildDateTime(state.end, action.payload) };
      return { ...state, end: action.payload };

    case Actions.RESET_STATE:
      return initialState;
    default:
      throw new Error(`unhandled action: ${action}`);
  }
};

const useNewActivity = () => {
  const [state, dispatch] = useReducer(newActivityReducer, initialState);

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
    resetState: () => dispatch({ type: Actions.RESET_STATE }),
    validate: (input: StateType) => {
      const validationErrors = [];
      for (const key of Object.keys(input) as (keyof typeof input)[]) {
        if (key === "title" && !isValidCharLength(input[key], 50))
          validationErrors.push({ key, error: "LENGTH" });
        if (
          (key === "activity" || key === "notes") &&
          !isValidCharLength(input[key], 255)
        )
          validationErrors.push({ key, error: "LENGTH" });
        if (key === "notes" || key === "color") continue;
        if (!isDefined([input[key]]))
          validationErrors.push({ key, error: "UNDEFINED" });
      }
      if (!isValidDateOrder(input.start, input.end))
        validationErrors.push({ key: "end", error: "DATE_ORDER" });

      return validationErrors;
    },
    submit: () => {},
  };

  return {
    state,
    actions,
  };
};

export default useNewActivity;
