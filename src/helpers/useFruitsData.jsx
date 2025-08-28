import randomInteger from 'random-int';
import { useEffect, useState } from 'react';

export default function useFruitsData() {
  const [loading, setLoading] = useState(true);
  const [fruits, setFruits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/data.json');

        await new Promise((resolve) =>
          setTimeout(resolve, randomInteger(450, 1000))
        ); // simulate delay

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (isMounted) {
          setFruits(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch fruits data');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { fruits, loading, error };
}
