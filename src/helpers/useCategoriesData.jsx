import randomInteger from 'random-int';
import { useEffect, useState } from 'react';

export default function useCategoriesData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/categories.json');

        await new Promise((resolve) =>
          setTimeout(resolve, randomInteger(450, 1000))
        ); // simulate delay

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (isMounted) {
          setCategories(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch categories data');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { error, categories, loading };
}
