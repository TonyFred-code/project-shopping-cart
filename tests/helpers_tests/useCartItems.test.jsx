import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import useCartItems from '../../src/helpers/useCartItems.jsx';
import fetchCartItems from '../../src/helpers/fetchCartItems.js';

vi.mock('../../src/helpers/fetchCartItems.js');

const fakeFruitData = [
  { id: 1, name: 'mango', price: 23 },
  { id: 2, name: 'apple', price: 35 },
];
const fakeCartItems = [1, 2];

function DummyContent() {
  const { loading, cartItems } = useCartItems();

  if (loading) return <div>Loading...</div>;

  if (cartItems.length === 0) return <div>No item found</div>;

  return (
    <div>
      {cartItems.map((cartItem) => {
        const [fruitData] = fakeFruitData.filter((item) => {
          return item.id === cartItem;
        });

        const { name, price } = fruitData;
        return (
          <div key={cartItem}>
            <span>{name}</span>
            <span>{price}</span>
          </div>
        );
      })}
    </div>
  );
}

describe('useCartItems', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading screen on comp load', () => {
    vi.mocked(fetchCartItems).mockResolvedValue(fakeCartItems);
    render(<DummyContent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render "no item found" if cart cache is an empty array', async () => {
    vi.mocked(fetchCartItems).mockResolvedValue([]);
    render(<DummyContent />);

    expect(await screen.findByText(/no item found/i)).toBeInTheDocument();
  });

  it('should render cart items if found', async () => {
    vi.mocked(fetchCartItems).mockResolvedValue(fakeCartItems);
    render(<DummyContent />);

    expect(await screen.findByText(/mango/i)).toBeInTheDocument();
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
  });
});
