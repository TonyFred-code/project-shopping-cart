import { it, expect, describe, vi, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import CartsPage from '../../src/pages/CartsPage.jsx';
import { MemoryRouter } from 'react-router-dom';

import * as cartsHook from '../../src/helpers/useCartItems.jsx';

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
      uploadCartItem: vi.fn(),
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
});
