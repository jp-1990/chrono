import moment, { Moment } from 'moment';

export const convertDateToMidnightUnixString = (date: number | string) => {
  return Number(moment(moment(Number(date)).format('YYYY-MM-DD')).format('x'));
};

export const addDayUnixString = (date: number | string) => {
  return Number(
    moment(moment(Number(date)).add(1, 'days').format('YYYY-MM-DD')).format('x')
  );
};

export const durationInHours = (a: Moment, b: Moment) => {
  return Number(moment.duration(b.diff(a)).asHours());
};
export const startOfDay = (date: number) => {
  return Number(moment(date).startOf('day').format('x'));
};
export const endOfDay = (date: number) => {
  return Number(moment(date).endOf('day').format('x'));
};

export const hoursToHoursAndMinutes = (hours = 0) => {
  const input = String(hours).split('.');
  const outputHours = input[0];
  const outputMinutes = (Number(`0.${input[1] || 0}`) * 60).toFixed(2);
  return {
    hours: Number(outputHours),
    minutes: Number(outputMinutes),
  };
};

export const buildDateTime = (
  date: Date | undefined,
  time: Date | undefined
) => {
  if (!date || !time) return;
  const dateString = date.toDateString();
  const timeString = time.toTimeString();
  return new Date(`${dateString} ${timeString}`);
};
