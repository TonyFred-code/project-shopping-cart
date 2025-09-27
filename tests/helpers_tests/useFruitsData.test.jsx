import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import useFruitsData from '../../src/helpers/useFruitsData.jsx';
import fetchFruits from '../../src/helpers/fetchFruits.js';

const mockFruitsData = [{ id: 1, name: 'Mango', price: 244 }];

vi.mock('../../src/helpers/fetchFruits.js');

function DummyComponent() {
  const { error, fruits, loading } = useFruitsData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      {fruits.map(({ id, name, price }) => (
        <div key={id}>
          <div>{name}</div>
          <div>{price}</div>
        </div>
      ))}
    </div>
  );
}

const renderDummyComponent = () => render(<DummyComponent />);

describe('useFruitsData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    fetchFruits.mockResolvedValueOnce(mockFruitsData);
    renderDummyComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders fruits when fetchFruits resolves', async () => {
    fetchFruits.mockResolvedValueOnce(mockFruitsData);
    renderDummyComponent();

    expect(await screen.findByText('Mango')).toBeInTheDocument();
    expect(screen.getByText('244')).toBeInTheDocument();
  });

  it('renders error when fetchFruits rejects', async () => {
    fetchFruits.mockRejectedValueOnce(new Error('boom'));
    renderDummyComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
