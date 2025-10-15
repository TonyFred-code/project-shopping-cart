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

/**
 *
 * @param {months | "all year round"} monthsArray
 * @returns true if months Array is the string "all year round"
 * @throws "invalid argument error" if months is not an array or invalid array (0 length)
 * all year round season availability is not on sale
 * if one of months in seasonAvailability is same as current month, it is not on sale
 * if current month is not in seasonAvailability fruit is on sale
 */
export function seasonAvailabilityOnSale(seasonAvailability) {
  if (typeof seasonAvailability === 'string') {
    return /all year round/i.test(seasonAvailability);
  }

  if (
    !seasonAvailability ||
    !Array.isArray(seasonAvailability) ||
    seasonAvailability.length === 0
  ) {
    throw new Error(
      'Invalid argument: Expected array of months or array with "All year round"'
    );
  }

  let onSale = false;

  seasonAvailability.forEach((month) => {
    const matcher = new RegExp(getCurrentMonth(), 'i');

    onSale = matcher.test(month);
  });

  return onSale;
}

export function fruitOnSale(fruitData) {
  if (!fruitData || !Array.isArray(fruitData.season_availability)) {
    throw new Error('Invalid fruit data');
  }

  const currentMonthName = getCurrentMonth();
  return (
    !fruitData.season_availability.includes(currentMonthName) &&
    !fruitData.season_availability.includes('All year round')
  );
}

export function fruitSalePercent(fruitData) {
  if (!fruitData || !fruitOnSale(fruitData)) {
    return 0;
  }

  return getRandomDiscount();
}
