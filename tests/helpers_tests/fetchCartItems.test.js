import { it, expect, describe, vi, beforeEach } from 'vitest';
import randomInteger from 'random-int';
import fetchCartItems from '../../src/helpers/fetchCartItems.js';
import { CART_KEY } from '../../src/constants/cartsCache.js';

vi.mock('random-int');

describe('fetchCartItems', () => {
  beforeEach(() => {
    vi.mocked(randomInteger).mockReturnValue(0);
  });

  it('should return an empty array if no cart items is found', async () => {
    const result = await fetchCartItems();

    expect(result).toEqual([]);
  });

  it('should return an empty array if an empty array of cart items is found', async () => {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    const result = await fetchCartItems();

    expect(result).toEqual([]);
  });

  it('should return data if data is present in cache', async () => {
    localStorage.setItem(CART_KEY, JSON.stringify([1, 2]));
    const result = await fetchCartItems();

    expect(result).toEqual([1, 2]);
  });
});
