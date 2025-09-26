// helpers/fetchCategories.js
import randomInteger from 'random-int';
import loadCachedData from './loadCachedData.js';

export async function fetchCategories() {
  const CACHE_KEY = 'categories_cache';
  const CACHE_TIME_KEY = 'categories_cache_time';
  const CACHE_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours
  const LOADER_DURATION = randomInteger(500, 700);

  // utility: sleep
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function loadCachedCategoriesData(offline = false) {
    return loadCachedData(offline, CACHE_KEY, CACHE_TIME_KEY, CACHE_EXPIRATION);
  }

  const cached = loadCachedCategoriesData();
  if (cached) {
    await sleep(LOADER_DURATION); // keep the fake delay
    return cached;
  }

  try {
    const response = await fetch('/categories.json');
    await sleep(LOADER_DURATION);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    if (!data || data.length === 0) throw new Error('Fetch failed');

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return data;
  } catch (err) {
    const backup = loadCachedCategoriesData(true);
    if (backup) return backup;
    throw err;
  }
}
