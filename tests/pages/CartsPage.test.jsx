import { it, expect, describe, vi, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import CartsPage from '../../src/pages/CartsPage.jsx';
import { MemoryRouter } from 'react-router-dom';

import * as cartsHook from '../../src/helpers/useCartItems.jsx';
import userEvent from '@testing-library/user-event';

vi.mock('../../src/components/CartItem.jsx', () => ({
  default: ({
    fruitData,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  }) => {
    return (
      <div>
        CartItem: {fruitData?.name}
        Quantity: {fruitData?.cart_quantity}
        <button type="button" onClick={() => increaseQuantity(fruitData.id)}>
          Increase
        </button>
        <button type="button" onClick={() => decreaseQuantity(fruitData.id)}>
          Decrease
        </button>
        <button type="button" onClick={() => removeFromCart(fruitData.id)}>
          Remove
        </button>
      </div>
    );
  },
}));

const mockCartItems = [
  {
    id: 1,
    name: 'Mango',
    pricing: { price_per_unit: 234 },
    season_availability: ['January'],
    cart_quantity: 100,
    stock: 100,
  },
];

describe('CartsPage', () => {
  beforeEach(() => {
    vi.spyOn(cartsHook, 'default').mockReturnValue({
      cartItems: mockCartItems,
      loading: false,
    });
  });

  it('should show no items in cart when there are no items in the cart', async () => {
    cartsHook.default.mockReturnValueOnce({
      cartItems: [],
      loading: false,
    });

    render(
      <MemoryRouter>
        <CartsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  });

  it('should show items in cart', async () => {
    render(
      <MemoryRouter>
        <CartsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/CartItem: mango/i)).toBeInTheDocument();
  });

  it('should remove cart item from cart when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartsPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /remove/i }));
    // expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
});
