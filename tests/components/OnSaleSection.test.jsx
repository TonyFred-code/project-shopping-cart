import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import OnSaleSection from '../../src/components/OnSaleSection.jsx';
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

const fruits = [{ id: 1, name: 'Mango', price: 233 }];
const mockShowProductDetails = vi.fn();

const renderOnSaleSection = (props = {}) => {
  return render(
    <OnSaleSection
      loading={false}
      showProductDetails={mockShowProductDetails}
      fruits={fruits}
      {...props}
    />
  );
};

describe('OnSaleSection', () => {
  it('should render to match snapshot when loading', () => {
    const { container } = renderOnSaleSection({ loading: true });

    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText(/three-dots-loading/i)).toBeInTheDocument();
  });

  it('should render to match snapshot when not loading', () => {
    const { container } = renderOnSaleSection();

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/Mango/i)).toBeInTheDocument();
  });

  it('should render section header', () => {
    renderOnSaleSection();

    expect(screen.getByText(/on sale/i)).toBeInTheDocument();
  });

  it('should call showProductDetails when product add to cart button is clicked', async () => {
    const user = userEvent.setup();
    renderOnSaleSection();

    const addToCartButton = screen.getByRole('button', { name: /click me/i });
    await user.click(addToCartButton);

    expect(mockShowProductDetails).toHaveBeenCalledWith(fruits[0].id);
  });
});
