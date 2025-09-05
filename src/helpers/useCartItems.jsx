import randomInteger from 'random-int';
import { useEffect, useState } from 'react';

export default function useCartItems() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const CART_KEY = 'cart_items';
    const LOADER_DURATION = randomInteger(200, 500);

    function loadCartItems() {
      const data = JSON.parse(localStorage.getItem(CART_KEY));

      if (data && data.length > 0) {
        return data;
      }

      return [];
    }

    setCartItems(loadCartItems());
    setTimeout(() => {
      setLoading(false);
    }, LOADER_DURATION);
  }, []);

  return { cartItems, loading };
}
