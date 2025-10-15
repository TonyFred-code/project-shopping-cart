import randomInteger from 'random-int';
import loadCachedData from './loadCachedData.js';
import {
  CACHE_EXPIRATION,
  CACHE_KEY,
  CACHE_TIME_KEY,
} from '@/constants/fruitsCache.js';

export default async function fetchFruits() {
  const LOADER_DURATION = randomInteger(500, 799);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function loadCachedFruitsData(offline = false) {
    return loadCachedData(offline, CACHE_KEY, CACHE_TIME_KEY, CACHE_EXPIRATION);
  }

  const cached = loadCachedFruitsData();
  if (cached) {
    await sleep(LOADER_DURATION);
    return cached;
  }

  try {
    const response = await fetch('/data.json');
    await sleep(LOADER_DURATION);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    if (!data || data.length === 0) throw new Error('Fetch failed');

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return data;
  } catch (error) {
    const backup = loadCachedFruitsData(true);
    if (backup) return backup;

    throw error;
  }
}
