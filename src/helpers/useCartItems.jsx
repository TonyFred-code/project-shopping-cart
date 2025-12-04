import { useEffect, useState } from 'react';
import fetchCartItems from './fetchCartItems.js';
import { CART_KEY } from '@/constants/cartsCache.js';

function fruitInCart(fruitId, cartItems) {
  return cartItems.some((cartItem) => cartItem.id === fruitId);
}

export default function useCartItems() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  function cacheCartItems(cache) {
    localStorage.setItem(CART_KEY, JSON.stringify(cache));
  }

  function addItemToCart(fruitData) {
    const isFruitInCart = fruitInCart(fruitData.id, cartItems);

    if (!isFruitInCart) {
      setCartItems([...cartItems, fruitData]);
      cacheCartItems([...cartItems, fruitData]);
    }
  }

  function removeItemFromCart(fruitId) {
    const isFruitInCart = fruitInCart(fruitId, cartItems);

    if (isFruitInCart) {
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== fruitId
      );
      setCartItems(updatedCartItems);

      cacheCartItems(updatedCartItems);
    }
  }

  function emptyCart() {
    setCartItems([]);
    cacheCartItems([]);
  }

  function decreaseCartItem(fruitData) {
    const { id, cart_quantity } = fruitData;
    const isFruitInCart = fruitInCart(id, cartItems);

    if (isFruitInCart) {
      const quantityToBeAdded = cart_quantity - 1 >= 0 ? cart_quantity - 1 : 0;

      const updatedCartItem = cartItems
        .map((cartItem) => {
          if (cartItem.id === id) {
            return {
              ...cartItem,
              cart_quantity: quantityToBeAdded,
            };
          }

          return cartItem;
        })
        .filter((item) => item.cart_quantity > 0);

      setCartItems(updatedCartItem);
      cacheCartItems(updatedCartItem);
    }
  }

  function increaseCartItem(fruitData) {
    const { id, cart_quantity, stock } = fruitData;
    const isFruitInCart = fruitInCart(id, cartItems);

    if (isFruitInCart) {
      const quantityToBeAdded =
        cart_quantity + 1 <= stock ? cart_quantity + 1 : stock;

      const updatedCartItem = cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            cart_quantity: quantityToBeAdded,
          };
        }

        return cartItem;
      });

      setCartItems(updatedCartItem);
      cacheCartItems(updatedCartItem);
    }
  }

  function addMultipleCartItems(quantity, fruitData) {
    let updatedCartItems = [];
    const { id, stock, cart_quantity } = fruitData;
    const isFruitInCart = fruitInCart(id, cartItems);

    if (isFruitInCart) {
      const quantityToBeAdded =
        cart_quantity + 1 <= stock ? cart_quantity + 1 : stock;

      updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === id) {
          return {
            ...cartItem,
            cart_quantity: quantityToBeAdded,
          };
        }

        return cartItem;
      });
    } else {
      updatedCartItems = [
        ...cartItems,
        { ...fruitData, cart_quantity: quantity },
      ];
    }

    setCartItems(updatedCartItems);
    cacheCartItems(updatedCartItems);
  }

  useEffect(() => {
    fetchCartItems()
      .then((data) => setCartItems(data))
      .finally(() => setLoading(false));
  }, []);

  return {
    cartItems,
    loading,
    addItemToCart,
    removeItemFromCart,
    decreaseCartItem,
    increaseCartItem,
    emptyCart,
    addMultipleCartItems,
  };
}
