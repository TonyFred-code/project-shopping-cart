import { it, expect, describe, vi, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import CartsPage from '../../src/pages/CartsPage.jsx';
import { MemoryRouter } from 'react-router-dom';

import * as fruitsHook from '../../src/helpers/useFruitsData.jsx';
import * as cartsHook from '../../src/helpers/useCartItems.jsx';

const mockFruits = [
  {
    id: 1,
    name: 'Mango',
    pricing: { price_per_unit: 234 },
    season_availability: ['January'],
  },
];

describe('CartsPage', () => {
  beforeEach(() => {
    vi.spyOn(fruitsHook, 'default').mockReturnValue({
      fruits: mockFruits,
      loading: false,
      error: null,
    });
  });

  it('should render error if fetch call fails', async () => {
    fruitsHook.default.mockReturnValueOnce({
      fruits: [],
      loading: false,
      error: new Error('failed'),
    });

    render(
      <MemoryRouter>
        <CartsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('should show no items in cart when there are no items in the cart', async () => {
    fruitsHook.default.mockReturnValueOnce({
      fruits: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <CartsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
  });
});
