import randomInteger from 'random-int';
import { useEffect, useState } from 'react';

export default function useFruitsData() {
  const [loading, setLoading] = useState(true);
  const [fruits, setFruits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const CACHE_KEY = 'fruits_cache';
    const CACHE_TIME_KEY = 'fruits_cache_time';
    const CACHE_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds;
    const LOADER_DURATION = randomInteger(799, 1099);

    async function fetchFruitsData() {
      const response = await fetch('/data.json');

      await new Promise((resolve) => setTimeout(resolve, LOADER_DURATION)); // simulate delay

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      const dataObj = JSON.stringify(data);

      if (dataObj.length === 0) throw new Error('Fetch Failed');

      // Store data and timestamp in localstorage;
      localStorage.setItem(CACHE_KEY, dataObj);
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

      return data;
    }

    function loadCachedFruitData(offline = false) {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

      if (cachedData && cachedData.length !== 0 && cachedTime) {
        const timeElapsed = Date.now() - parseInt(cachedTime, 10);
        if (timeElapsed < CACHE_EXPIRATION || offline) {
          return cachedData; // Use cached data if it's still valid
        }
      }
      return null; // Cache is invalid or non-existent
    }

    const cachedFruitsData = loadCachedFruitData();

    if (cachedFruitsData) {
      setFruits(cachedFruitsData);
      setTimeout(() => {
        setLoading(false);
      }, LOADER_DURATION);
    } else {
      fetchFruitsData()
        .then((data) => {
          setFruits(data);
        })
        .catch((err) => {
          const backUp = loadCachedFruitData(true);

          if (backUp) {
            setFruits(backUp);
          } else {
            setError(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return { fruits, loading, error };
}
