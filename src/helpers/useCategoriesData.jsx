import randomInteger from 'random-int';
import { useEffect, useState } from 'react';

export default function useCategoriesData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const CACHE_KEY = 'categories_cache';
    const CACHE_TIME_KEY = 'categories_cache_time';
    const CACHE_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds;
    const LOADER_DURATION = randomInteger(799, 1099);

    async function fetchCategoriesData() {
      const response = await fetch('/categories.json');

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

    function loadCachedCategoriesData(offline = false) {
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

    const cachedCategoriesData = loadCachedCategoriesData();

    if (cachedCategoriesData) {
      setCategories(cachedCategoriesData);
      setTimeout(() => {
        setLoading(false);
      }, LOADER_DURATION);
    } else {
      fetchCategoriesData()
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => {
          const backUp = loadCachedCategoriesData(true);

          if (backUp) {
            setCategories(backUp);
          } else {
            setError(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return { error, categories, loading };
}
