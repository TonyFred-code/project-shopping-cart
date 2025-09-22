import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import ProductCard from '../../src/components/ProductCard.jsx';
import userEvent from '@testing-library/user-event';

vi.mock('../../src/helpers/randomArrayElement.js', {
  spy: true,
  default: () => 1,
});
vi.mock('react-image-filler', () => ({
  default: () => {
    return <div>some image</div>;
  },
}));
const mockShowProductDetails = vi.fn();

const fruitData = {
  id: 1,
  name: 'Mango',
  pricing: {
    price_per_unit: 244,
  },
  categories: ['category1', 'category2'],
};

const renderProductCard = (props = {}) => {
  return render(
    <ProductCard
      fruitData={fruitData}
      showProductDetails={mockShowProductDetails}
      {...props}
    />
  );
};

describe('ProductCard', () => {
  it('should render to match snapshot', () => {
    const { container } = renderProductCard();

    expect(container).toMatchSnapshot();
  });

  it('should call showProductDetails with fruit id when cart button is clicked', async () => {
    const user = userEvent.setup();
    renderProductCard();

    const cartButton = screen.getByRole('button', { name: /cart/i });
    await user.click(cartButton);

    expect(mockShowProductDetails).toHaveBeenCalledWith(fruitData.id);
  });

  it('renders wishlist button', () => {
    // test will serve as functionality testing later
    renderProductCard();

    expect(screen.queryByTestId('wishlist-button')).toBeInTheDocument();
  });

  it('renders product details', () => {
    renderProductCard();

    expect(screen.getByText(/mango/i)).toBeInTheDocument();
    expect(screen.queryByText(/244/)).toBeInTheDocument();
    expect(screen.getByText(/category(1|2)/i)).toBeInTheDocument();
  });
});
