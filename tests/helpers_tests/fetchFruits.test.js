import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import loadCachedData from '../../src/helpers/loadCachedData.js';
import fetchFruits from '../../src/helpers/fetchFruits.js';
import randomInteger from 'random-int';
import {
  CACHE_EXPIRATION,
  CACHE_KEY,
  CACHE_TIME_KEY,
} from '../../src/constants/fruitsCache.js';

const fakeData = [
  { id: 1, name: 'mango', price: 22, season_availability: 'all year round' },
];
vi.mock('../../src/helpers/loadCachedData.js');
vi.mock('random-int');

beforeEach(() => {
  vi.mocked(randomInteger).mockReturnValue(0);
  vi.stubGlobal(
    'fetch',
    vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: async () => fakeData,
      });
    })
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe('fetchFruits', () => {
  it('should return cached data if data is valid without fetching any data', async () => {
    vi.mocked(loadCachedData).mockReturnValue(fakeData);

    const result = await fetchFruits();

    expect(result).toMatchObject(fakeData);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should throw error if fetch returned with a not okay response with no cached data', async () => {
    vi.mocked(loadCachedData).mockReturnValue(null);
    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: false,
        json: async () => [],
      });
    });

    await expect(fetchFruits()).rejects.toThrowError(
      /network response was not ok/i
    );
  });

  it('should throw error if fetch returned with an empty array and no cached data', async () => {
    vi.mocked(loadCachedData).mockReturnValue(null);
    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: async () => [],
      });
    });

    await expect(fetchFruits()).rejects.toThrowError(/fetch failed/i);
  });

  it('should load fresh data if no valid cache exists and store in cache', async () => {
    const result = await fetchFruits();

    expect(result).toMatchObject(fakeData);
    expect(fetch).toHaveBeenCalledWith('/data.json');

    const cacheValue = JSON.parse(localStorage.getItem(CACHE_KEY));
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

    expect(cacheValue).toMatchObject(fakeData);
    expect(typeof Number(cacheTime)).toBe('number');
    expect(Number(cacheTime)).toBeGreaterThan(0);
  });

  it('should fall back to cache data if fetch fails', async () => {
    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: async () => [], // fails call
      });
    });
    vi.mocked(loadCachedData).mockReturnValueOnce(null);
    vi.mocked(loadCachedData).mockReturnValueOnce(fakeData);

    const result = await fetchFruits();

    expect(result).toEqual(fakeData);
  });

  it('should fall back to cache data if fetch fails and cached data is expired', async () => {
    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        ok: true,
        json: async () => [], // fails call
      });
    });
    vi.mocked(loadCachedData).mockReturnValueOnce(null);
    vi.mocked(loadCachedData).mockReturnValueOnce(fakeData);

    const result = await fetchFruits();
    expect(loadCachedData).toHaveBeenCalledTimes(2);
    expect(loadCachedData).toHaveBeenNthCalledWith(
      1,
      false,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    ); // initial call mock
    expect(loadCachedData).toHaveBeenLastCalledWith(
      true,
      CACHE_KEY,
      CACHE_TIME_KEY,
      CACHE_EXPIRATION
    ); // second call mock marked as offline
    expect(result).toEqual(fakeData);
  });

  //TODO: add test for attaching in season, sale, and discount properties to fetched data
});
