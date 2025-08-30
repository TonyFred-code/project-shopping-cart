import { describe, test, expect } from 'vitest';
import randomArrayElement from '../../src/helpers/randomArrayElement.js';

describe('randomArrayElement', () => {
  test('returns first array element if array contains only one element', () => {
    const array = [2];

    expect(randomArrayElement(array)).toBe(2);
  });

  test('returns any array element if array contains more than one element', () => {
    const array = [2, 3];

    expect(randomArrayElement(array)).toBeOneOf([2, 3]);
  });

  test('returns null if array contains no elements', () => {
    const array = [];

    expect(randomArrayElement(array)).toBe(null);
  });

  test('should throw error if parameter is not an array type', () => {
    expect(() => randomArrayElement(2)).toThrowError();
  });
});
