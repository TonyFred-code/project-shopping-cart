import { useEffect, useState } from 'react';
import fetchFruits from './fetchFruits.js';

export default function useFruitsData() {
  const [loading, setLoading] = useState(true);
  const [fruits, setFruits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFruits()
      .then((data) => setFruits(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { fruits, loading, error };
}
