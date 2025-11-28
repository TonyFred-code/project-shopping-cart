import { useEffect, useState } from 'react';
import fetchCartItems from './fetchCartItems.js';
import { CART_KEY } from '@/constants/cartsCache.js';

function fruitInCart(fruitId, cartItems) {
  return cartItems.some((cartItem) => cartItem.id === fruitId);
}

export default function useCartItems() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  function uploadCartItem(quantity, fruitId) {
    const isFruitInCart = fruitInCart(fruitId, cartItems);
    let updatedCartItems = [];
    if (isFruitInCart) {
      updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === fruitId) {
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }

        return cartItem;
      });
    } else {
      updatedCartItems = [...cartItems, { id: fruitId, quantity }];
    }

    setCartItems(updatedCartItems);
  }

  useEffect(() => {
    fetchCartItems()
      .then((data) => setCartItems(data))
      .finally(() => setLoading(false));
  }, []);

  return { cartItems, loading, uploadCartItem };
}
