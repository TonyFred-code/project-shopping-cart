import randomInteger from 'random-int';

function getCurrentMonth() {
  return new Date().toLocaleString('default', { month: 'long' });
}

function getRandomDiscount(min = 5, max = 55) {
  return randomInteger(min, max);
}

export function fruitOnSale(fruitData, discountRange = { min: 5, max: 55 }) {
  if (!fruitData || !Array.isArray(fruitData.season_availability)) {
    throw new Error('Invalid fruit data');
  }

  const currentMonthName = getCurrentMonth();
  if (
    fruitData.season_availability.includes(currentMonthName) ||
    fruitData.season_availability.includes('All year round')
  )
    return 0;

  return getRandomDiscount(discountRange.min, discountRange.max);
}
