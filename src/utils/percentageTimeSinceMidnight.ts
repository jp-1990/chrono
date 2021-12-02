/**
 * @param  {Date} date
 * @returns {number}
 *
 * @description calculates the percentage of time a date is from the previous midnight in milliseconds, and returns a number between 1-100 to be treated as a percentage.
 */
const percentageTimeSinceMidnight = (date: Date): number => {
  const msInDay = 1000 * 60 * 60 * 24;
  const msSinceMidnight = date.getTime() - date.setHours(0, 0, 0, 0);
  return (msSinceMidnight / msInDay) * 100;
};

export default percentageTimeSinceMidnight;
