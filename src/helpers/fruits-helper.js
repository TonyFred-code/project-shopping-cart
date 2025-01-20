import randomInteger from 'random-int';

function fruitOnSale(fruitData) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const today = new Date();
  const currentMonthName = months[today.getMonth()];

  const { season_availability } = fruitData;

  if (season_availability.includes(currentMonthName)) return 0;

  return randomInteger(5, 55);
}

export default {
  fruitOnSale,
};
