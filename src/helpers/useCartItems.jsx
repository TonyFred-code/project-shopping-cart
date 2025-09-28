import { useEffect, useState } from 'react';
import fetchCartItems from './fetchCartItems.js';

export default function useCartItems() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems()
      .then((data) => setCartItems(data))
      .finally(() => setLoading(false));
  }, []);

  return { cartItems, loading };
}
