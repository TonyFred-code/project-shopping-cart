import { it, expect, describe, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import InSeasonSection from '../../src/components/InSeasonSection.jsx';
import userEvent from '@testing-library/user-event';

vi.mock('../../src/components/ProductCard.jsx', () => ({
  default: ({ fruitData, showProductDetails }) => {
    return (
      <div>
        <span>{fruitData.name}</span>
        <span>{fruitData.price}</span>
        <button type="button" onClick={showProductDetails}>
          Click Me
        </button>
      </div>
    );
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

const mockShowProductDetails = vi.fn();
const fruits = [{ id: 1, name: 'Mango' }];

const renderInSeason = (props = {}) => {
  return render(
    <InSeasonSection
      fruits={[]}
      loading={false}
      showProductDetails={mockShowProductDetails}
      {...props}
    />
  );
};

describe('InSeasonSection', () => {
  it('should render content with loader if given empty  fruits list', () => {
    const { container } = renderInSeason({ loading: true });

    expect(container).toMatchSnapshot();
  });

  it('should render to match snapshot with fruits data when not loading', () => {
    const { container } = renderInSeason({ fruits });

    expect(container).toMatchSnapshot();
  });

  it('shows spinner when loading', () => {
    renderInSeason({ loading: true });
    expect(screen.getByLabelText(/three-dots-loading/i)).toBeInTheDocument();
  });

  it('renders products when not loading', () => {
    renderInSeason({ fruits });
    expect(screen.getByText(/Mango/i)).toBeInTheDocument();
  });

  it('should render header for section', () => {
    renderInSeason();

    expect(screen.getByText(/trending picks/i)).toBeInTheDocument();
  });

  it('should call showProductDetails when product button is clicked', async () => {
    const user = userEvent.setup();
    renderInSeason({ fruits });

    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(mockShowProductDetails).toHaveBeenCalled();
  });
});
