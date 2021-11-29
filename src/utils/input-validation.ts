/**
 * @param  {string} string
 * @param  {number} maxLength
 * @returns {boolean} boolean
 *
 * @description validate the length of a string
 */
const isValidCharLength = (
  string: string | undefined,
  maxLength: number
): boolean => {
  if (string === null || string === undefined) return false;
  if (string.length > maxLength) return false;
  return true;
};

/**
 * @param  {any[]} items
 * @return {boolean} boolean
 *
 * @description iterates through the input array and returns false if any item is undefined || null || '' (returns true for all other falsy values)
 */
const isDefined = (items: (any | undefined)[]): boolean => {
  for (const item of items) {
    if (item === undefined || item === null || item === "") return false;
  }
  return true;
};
/**
 * @param  {Date} dateA
 * @param  {Date} dateB
 * @returns {boolean} boolean
 *
 * @description returns false if dateB is chronologically earlier than dateA, otherwise true
 */
const isValidDateOrder = (
  dateA: Date | undefined,
  dateB: Date | undefined
): boolean => {
  if (!dateA || !dateB) return true;
  if (dateA.getTime() >= dateB.getTime()) return false;
  return true;
};

export default {
  isValidCharLength,
  isValidDateOrder,
  isDefined,
};
