import { it, expect, describe, beforeEach, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import arrayShuffle from 'array-shuffle';
import sortBy from 'sort-by';

vi.mock('array-shuffle', { spy: true });
vi.mock('sort-by', { spy: true });

vi.mock('../../src/components/ProductCard.jsx', () => ({
  default: ({ fruitData, showProductDetails }) => {
    return (
      <div>
        Product Card {fruitData?.name}
        <button onClick={() => showProductDetails(1)}>Show</button>
      </div>
    );
  },
}));

vi.mock('../../src/components/ProductDetails.jsx', () => ({
  default: ({ fruitData, toggleOpen, closeProductDetails }) => {
    return (
      <div>
        ProductDetails {fruitData?.name}
        <button onClick={toggleOpen}>Toggle</button>
        <button onClick={closeProductDetails}>Close</button>
      </div>
    );
  },
}));

import ProductsPage from '../../src/pages/ProductsPage.jsx';
import * as fruitsHook from '../../src/helpers/useFruitsData.jsx';
import * as cartHook from '../../src/helpers/useCartItems.jsx';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockFruits = [
  {
    id: 1,
    name: 'Mango',
    pricing: { price_per_unit: 234 },
    season_availability: ['January'],
  },
];

describe('ProductsPage', () => {
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

    vi.mocked(arrayShuffle).mockReturnValue(mockFruits);
  });

  it('should  match page load snapshot', () => {
    const container = render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders failed to fetch on fetching error', async () => {
    fruitsHook.default.mockReturnValueOnce({
      fruits: [],
      loading: false,
      error: new Error('failed'),
    });

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });

  it('should render fetched fruits', async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Product card mango/i)).toBeInTheDocument();
  });

  it('should show product details when showProductDetails is called ', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /show/i }));

    expect(screen.getByText(/ProductDetails mango/i)).toBeInTheDocument();
  });

  it('should sort by name ascending when that is the choice sort mode', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByRole('combobox'), ['ascending-a-z']);

    expect(screen.getByRole('option', { name: /ascending/i }).selected).toBe(
      true
    );
    expect(sortBy).toHaveBeenCalledWith('name');
  });

  it('should sort by name descending when that is the choice sort mode', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByRole('combobox'), ['desc-a-z']);

    expect(screen.getByRole('option', { name: /descending/i }).selected).toBe(
      true
    );
    expect(sortBy).toHaveBeenCalledWith('-name');
  });

  it('should shuffle when user sorts by random', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByRole('combobox'), ['random']);

    expect(screen.getByRole('option', { name: /random/i }).selected).toBe(true);
    expect(arrayShuffle).toHaveBeenCalledWith(mockFruits);
  });
});
