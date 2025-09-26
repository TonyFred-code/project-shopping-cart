export default function loadCachedData(
  offline,
  CACHE_KEY,
  CACHE_TIME_KEY,
  CACHE_EXPIRATION
) {
  const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedData && cachedData.length !== 0 && cachedTime) {
    const timeElapsed = Date.now() - parseInt(cachedTime, 10);
    if (timeElapsed < CACHE_EXPIRATION || offline) {
      return cachedData;
    }
  }
  return null;
}
