import { useEffect, useState } from 'react';
import fetchCartItems from './fetchCartItems.js';
import { CART_KEY } from '@/constants/cartsCache.js';

function fruitInCart(fruitId, cartItems) {
  return cartItems.some((cartItem) => cartItem.id === fruitId);
}

export default function useCartItems() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  function uploadCartItem(quantity, fruitData) {
    const { stock, id } = fruitData;
    const isFruitInCart = fruitInCart(id, cartItems);

    let updatedCartItems = [];
    if (isFruitInCart) {
      updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          const quantityToBeAdded = quantity + cartItem.cart_quantity;

          if (stock >= quantityToBeAdded) {
            return {
              ...cartItem,
              cart_quantity: quantityToBeAdded,
            };
          } else if (stock < quantityToBeAdded) {
            return {
              ...cartItem,
              cart_quantity: stock,
            };
          }
        }

        return cartItem;
      });
    } else {
      updatedCartItems = [
        ...cartItems,
        {
          ...fruitData,
          cart_quantity: quantity,
        },
      ];
    }

    const finalCartItems = updatedCartItems.filter(
      (cartItem) => cartItem.cart_quantity > 0
    );

    setCartItems(finalCartItems);
    localStorage.setItem(CART_KEY, JSON.stringify(finalCartItems));
  }

  useEffect(() => {
    fetchCartItems()
      .then((data) => setCartItems(data))
      .finally(() => setLoading(false));
  }, []);

  return { cartItems, loading, uploadCartItem };
}
