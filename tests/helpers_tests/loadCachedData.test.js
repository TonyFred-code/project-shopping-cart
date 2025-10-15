import { it, expect, describe, vi, afterEach } from 'vitest';
import loadCachedData from '../../src/helpers/loadCachedData.js';

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

afterEach(() => {
  localStorage.clear();
  getItemSpy.mockClear();
  vi.useRealTimers();
});

const fakeData = [{ id: 1, name: 'mango', price: 23 }];
const CACHE_EXPIRATION = 5000;
const CACHE_KEY = 'cache_key';
const CACHE_TIME_KEY = 'cache_time_key';

describe('loadCachedData', () => {
  it('should return null if cached data cannot be found', () => {
    const result = loadCachedData(
      false,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    );

    expect(result).toBe(null);
  });

  it('should return cached data if offline', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(fakeData));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    const result = loadCachedData(
      true,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    );

    expect(result).toEqual(fakeData);
  });

  it('should return null if not offline but data has expired', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(fakeData));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    const date = new Date(Date.now() + CACHE_EXPIRATION);
    vi.setSystemTime(date);

    const result = loadCachedData(
      false,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    );

    expect(result).toBe(null);
  });

  it('should return cached data if data has expired but offline', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(fakeData));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    const date = new Date(Date.now() + CACHE_EXPIRATION);
    vi.setSystemTime(date);

    const result = loadCachedData(
      true,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    );

    expect(result).toEqual(fakeData);
  });

  it('should return null if cached data is an empty array', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify([]));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    const result = loadCachedData(
      false,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    );

    expect(result).toBe(null);
  });
});
