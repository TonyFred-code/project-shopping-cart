import { it, expect, describe, afterEach, vi } from 'vitest';
import { getCurrentMonth } from '../../src/helpers/fruits-helper.js';

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
});
