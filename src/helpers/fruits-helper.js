import randomInteger from 'random-int';

/**
 *
 * @returns {string} Current date in long format
 */
export function getCurrentMonth() {
  return new Date().toLocaleString('default', { month: 'long' });
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

export function fruitInSeason(fruitData) {
  if (!fruitData || !Array.isArray(fruitData.season_availability)) {
    throw new Error('Invalid fruit data');
  }

  const currentMonthName = getCurrentMonth();
  return fruitData.season_availability.includes(currentMonthName);
}
