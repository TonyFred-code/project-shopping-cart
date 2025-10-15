import { CART_KEY } from '@/constants/cartsCache.js';
import randomInteger from 'random-int';

export default async function fetchCartItems() {
  const LOADER_DURATION = randomInteger(200, 500);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const data = JSON.parse(localStorage.getItem(CART_KEY));

  await sleep(LOADER_DURATION);

  if (data && data.length > 0) {
    return data;
  }
  return [];
}
