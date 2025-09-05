import randomInteger from 'random-int';

export default function randomArrayElement(array) {
  if (!Array.isArray(array)) throw new TypeError('Expected type to be array');
  const arrayLength = array.length;

  if (arrayLength === 0) return null;

  const randomIndex = randomInteger(0, array.length - 1);

  return array[randomIndex];
}
