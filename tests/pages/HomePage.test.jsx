import { render, screen } from '@testing-library/react';
import { it, describe, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage.jsx';

// mock hooks
import * as fruitsHook from '../../src/helpers/useFruitsData.jsx';
import * as cartHook from '../../src/helpers/useCartItems.jsx';

// mock children (since already unit tested)
vi.mock('../../src/components/OnSaleSection.jsx', () => ({
  default: ({ showProductDetails }) => (
    <div>
      OnSale
      <button onClick={() => showProductDetails(1)}>Show</button>
    </div>
  ),
}));
vi.mock('../../src/components/InSeasonSection.jsx', () => ({
  default: () => <div>InSeason</div>,
}));
vi.mock('../../src/components/ProductDetails.jsx', () => ({
  default: ({ fruitData, toggleOpen, closeProductDetails }) => (
    <div>
      ProductDetails {fruitData?.name}
      <button onClick={toggleOpen}>Toggle</button>
      <button onClick={closeProductDetails}>Close</button>
    </div>
  ),
}));
vi.mock('../../src/components/LayoutWrapper.jsx', () => ({
  default: ({ children, cartItemsCount }) => (
    <div>
      CartCount:{cartItemsCount}
      {children}
    </div>
  ),
}));
vi.mock('../../src/components/HeroSection.jsx', () => ({
  default: () => <div>Hero</div>,
}));
vi.mock('../../src/components/HomePageWrapper.jsx', () => ({
  default: ({ children }) => <div>{children}</div>,
}));

const mockFruits = [
  {
    id: 1,
    name: 'Mango',
    pricing: { price_per_unit: 234 },
    season_availability: ['January'],
  },
  {
    id: 2,
    name: 'Banana',
    pricing: { price_per_unit: 20 },
    season_availability: 'All year round',
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    vi.spyOn(fruitsHook, 'default').mockReturnValue({
      fruits: mockFruits,
      loading: false,
      error: null,
    });
    vi.spyOn(cartHook, 'default').mockReturnValue({
      cartItems: [1],
      loading: false,
    });
  });

  it('renders FAILED TO FETCH on error', () => {
    fruitsHook.default.mockReturnValueOnce({
      fruits: [],
      loading: false,
      error: new Error('fail'),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('passes cart count to LayoutWrapper', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/CartCount:1/)).toBeInTheDocument();
  });

  it('opens product details when showProductDetails is called', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    screen.getByText('Show').click();
    expect(screen.getByText(/ProductDetails Mango/)).toBeInTheDocument();
  });

  it('closes product details when closeProductDetails is called', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    screen.getByText('Show').click();
    screen.getByText('Close').click();

    expect(screen.queryByText(/ProductDetails/)).not.toBeInTheDocument();
  });

  it('scrolls into view when location.hash is set', () => {
    const scrollIntoView = vi.fn();
    const fakeEl = { scrollIntoView };
    document.getElementById = vi.fn().mockReturnValue(fakeEl);

    render(
      <MemoryRouter initialEntries={['/#test']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(document.getElementById).toHaveBeenCalledWith('test');
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
