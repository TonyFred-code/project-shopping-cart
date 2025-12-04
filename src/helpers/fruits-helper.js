import randomInteger from 'random-int';

/**
 *
 * @returns {string} Current date in long format
 */
export function getCurrentMonth() {
  return new Date().toLocaleString('default', { month: 'long' });
}

export function getMonthByIndex(index) {
  if (index < 0 || index > 11)
    throw new Error('Index argument is out of bounds');

  const date = new Date();
  date.setDate(1);
  date.setMonth(index);

  return date.toLocaleString('default', { month: 'long' });
}

/**
 *
 * @param {number} min - The minimum value (inclusive)
 * @param {number} max - The maximum value (exclusive)
 * @returns {number} A random integer discount value between max and min
 */
export function getRandomDiscount(min = 5, max = 55) {
  return randomInteger(min, max);
}

function isAvailableAllYear(seasonAvailability) {
  if (typeof seasonAvailability === 'string') {
    seasonAvailability = seasonAvailability.trim();

    if (
      seasonAvailability.length === 0 ||
      !/all year round/i.test(seasonAvailability)
    ) {
      throw new Error(
        'Invalid Argument: expected parameter to match "all year round"'
      );
    }

    return true;
  }

  return false;
}

function isArrayOfValidMonths(monthsArray) {
  if (!Array.isArray(monthsArray) || monthsArray.length === 0) return false;

  return monthsArray.every((month) =>
    /january|february|march|april|may|june|july|august|september|october|november|december/i.test(
      month
    )
  );
}

/**
 * Checks if a fruit is currently in season based on its seasonal availability.
 *
 * @param {string | string[]} seasonAvailability
 *   A string "all year round" OR an array of month names (e.g., ["January", "Feb"]).
 *
 * @returns {boolean}
 *   Returns true if:
 *     - seasonAvailability is not "all year round", OR
 *     - the current month matches any month in the array.
 *   Otherwise returns false.
 *
 * @throws {Error}
 *   Throws if the argument is not a valid array or is an empty array.
 */
function isCurrentlyInSeason(seasonAvailability) {
  const availableAllYear = isAvailableAllYear(seasonAvailability);

  if (availableAllYear) return false;

  if (!isArrayOfValidMonths(seasonAvailability)) {
    throw new Error('Invalid argument: Expected non-empty array of months');
  }

  const currentMonth = getCurrentMonth();
  return seasonAvailability.some((month) =>
    new RegExp(currentMonth, 'i').test(month)
  );
}

/**
 * Determines if a fruit is currently in season.
 *
 * @param {string | string[]} seasonAvailability
 * @returns {boolean}
 */
export function fruitInSeason(seasonAvailability) {
  return isCurrentlyInSeason(seasonAvailability);
}

/**
 * Determines if a fruit should be considered "on sale".
 *
 * A fruit is on sale only if it is **not currently in season**
 * AND a random check passes.
 *
 * @param {string | string[]} seasonAvailability
 * @returns {boolean}
 */
export function fruitOnSale(seasonAvailability) {
  const outOfSeason = !isCurrentlyInSeason(seasonAvailability);
  const shouldDiscount = randomInteger(0, 10) % 2 === 0; // 50% chance

  return outOfSeason && shouldDiscount;
}

export function fruitSalePercent(fruitData) {
  if (!fruitData || !fruitOnSale(fruitData)) {
    return 0;
  }

  return getRandomDiscount();
}
