import { it, expect, describe, afterEach, vi } from 'vitest';
import {
  fruitInSeason,
  fruitMonthOnSale,
  fruitOnSale,
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

  describe('fruitInSeason', () => {
    it('should throw error if given an invalid string as argument', () => {
      expect(() => fruitInSeason('')).toThrowError(/invalid argument/i);
      expect(() => fruitInSeason('invalid')).toThrowError(/invalid argument/i);
    });

    it('should throw an error if given an invalid array ', () => {
      expect(() => fruitInSeason([])).toThrowError(/invalid argument/i);
    });

    it('should throw an error if array contains invalid month data', () => {
      expect(() => fruitInSeason(['invalid'])).toThrowError(
        /invalid argument/i
      );
    });

    it('should return false if seasonAvailability is all year round', () => {
      expect(fruitInSeason('all year round')).toBe(false);
    });

    it('should return true if seasonAvailability includes current month', () => {
      const date = new Date(2025, 10, 10);
      vi.setSystemTime(date);

      expect(fruitInSeason(['january', 'december', 'november'])).toBe(true);
    });

    it('should return false if seasonAvailability does not include current month', () => {
      const date = new Date(2025, 10, 10);
      vi.setSystemTime(date);

      expect(fruitInSeason(['january', 'december'])).toBe(false);
    });
  });

  describe('fruitOnSale', () => {
    it('should throw an error if given an invalid string as argument', () => {
      expect(() => fruitOnSale('')).toThrowError(/invalid argument/i);
      expect(() => fruitOnSale('invalid')).toThrowError(/invalid argument/i);
    });

    it('should throw error if given an invalid array as argument', () => {
      expect(() => fruitOnSale([])).toThrowError(/invalid argument/i);
    });

    it('should throw error if array contains invalid month data', () => {
      expect(() => fruitOnSale(['invalid'])).toThrowError(/invalid argument/i);
    });

    it('should return true if seasonAvailability is all year round and randomCheck passes', () => {
      vi.mocked(randomInteger).mockReturnValue(4);
      expect(fruitOnSale('all year round')).toBe(true);
    });

    it('should return false if seasonAvailability is all year round but randomCheck fails', () => {
      vi.mocked(randomInteger).mockReturnValue(9);
      expect(fruitOnSale('all year round')).toBe(false);
    });

    it('should return true if out of season and randomCheck passes', () => {
      vi.mocked(randomInteger).mockReturnValue(6);
      const date = new Date(2025, 10, 10);
      vi.setSystemTime(date);

      expect(fruitOnSale(['january', 'february'])).toBe(true);
    });

    it('should return false if out of season but randomCheck fails', () => {
      vi.mocked(randomInteger).mockReturnValue(9);
      const date = new Date(2025, 10, 11);
      vi.setSystemTime(date);

      expect(fruitOnSale(['january', 'november'])).toBe(false);
    });
  });

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
