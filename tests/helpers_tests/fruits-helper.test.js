import { it, expect, describe, afterEach, vi } from 'vitest';
import {
  getCurrentMonth,
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
});
