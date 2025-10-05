import { it, expect, describe, afterEach, vi } from 'vitest';
import {
  fruitMonthOnSale,
  getCurrentMonth,
  getMonthByIndex,
  getRandomDiscount,
} from '../../src/helpers/fruits-helper.js';

vi.mock('random-int', { spy: true });
import randomInteger from 'random-int';

describe('FruitsHelper', () => {
  describe('getCurrentMonth', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return current month in long format', () => {
      const date = new Date(2025, 11, 20);
      vi.setSystemTime(date);

      const currentMonth = getCurrentMonth();

      expect(currentMonth).toMatch(/december/i);
    });
  });

  describe('getRandomDiscount', () => {
    it('should use default range values if not args is given', () => {
      vi.mocked(randomInteger).mockReturnValue(42);

      const discount = getRandomDiscount();

      expect(randomInteger).toHaveBeenCalledWith(5, 55);
      expect(discount).toBe(42);
    });

    it('should use custom values if args are given', () => {
      vi.mocked(randomInteger).mockReturnValue(42);

      const discount = getRandomDiscount(2, 25);

      expect(randomInteger).toHaveBeenCalledWith(2, 25);
      expect(discount).toBe(42);
    });
  });

  // describe('fruitMonthOnSale', () => {
  //   it('should throw error if months array is empty or non valid', () => {
  //     expect(() => fruitMonthOnSale([])).toThrowError(/invalid argument/i);
  //   });

  //   it('should return true if months array is a string - "all year round"', () => {
  //     expect(fruitMonthOnSale('All year round')).toBe(true);
  //   });

  //   it('should throw error if month', () => {

  //   })
  // });

  describe('getMonthByIndex', () => {
    it('should throw an error if month index is out of bounds', () => {
      expect(() => getMonthByIndex(-1)).toThrowError(/out of bounds/i);
      expect(() => getMonthByIndex(12)).toThrowError(/out of bounds/i);
    });

    it.each([
      {
        monthIndex: 0,
        monthRegExp: /january/i,
      },
      {
        monthIndex: 1,
        monthRegExp: /february/i,
      },
      {
        monthIndex: 2,
        monthRegExp: /march/i,
      },
      {
        monthIndex: 3,
        monthRegExp: /april/i,
      },
      {
        monthIndex: 4,
        monthRegExp: /may/i,
      },
      {
        monthIndex: 5,
        monthRegExp: /june/i,
      },
      {
        monthIndex: 6,
        monthRegExp: /july/i,
      },
      {
        monthIndex: 7,
        monthRegExp: /august/i,
      },
      {
        monthIndex: 8,
        monthRegExp: /september/i,
      },
      {
        monthIndex: 9,
        monthRegExp: /october/i,
      },
      {
        monthIndex: 10,
        monthRegExp: /november/i,
      },
      {
        monthIndex: 11,
        monthRegExp: /december/i,
      },
    ])(
      'should return $monthRegExp if index is $monthIndex',
      ({ monthIndex, monthRegExp }) => {
        expect(getMonthByIndex(monthIndex)).toMatch(monthRegExp);
      }
    );
  });
});
