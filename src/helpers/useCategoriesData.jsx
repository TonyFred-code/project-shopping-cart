import { useEffect, useState } from 'react';
import { fetchCategories } from './fetchCategories.js';

export default function useCategoriesData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { error, categories, loading };
}
