import moment, { Moment } from "moment";

export const convertDateToMidnightUnixString = (date: number | string) => {
  return Number(moment(moment(Number(date)).format("YYYY-MM-DD")).format("x"));
};

export const addDayUnixString = (date: number | string) => {
  return Number(
    moment(moment(Number(date)).add(1, "days").format("YYYY-MM-DD")).format("x")
  );
};

export const durationInHours = (a: Moment, b: Moment) => {
  return Number(moment.duration(a.diff(b)).asHours());
};
export const startOfDay = (date: number) => {
  return Number(moment(date).startOf("day").format("x"));
};
export const endOfDay = (date: number) => {
  return Number(moment(date).endOf("day").format("x"));
};
