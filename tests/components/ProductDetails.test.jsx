import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import ProductDetails from '../../src/components/ProductDetails.jsx';
import userEvent from '@testing-library/user-event';

const mockCloseProductDetails = vi.fn();
const mockToggleOpen = vi.fn();

vi.mock('react-image-filler', () => ({
  default: () => {
    return <div>some image</div>;
  },
}));

vi.mock('../../src/helpers/randomArrayElement.js', () => {
  return {
    default: vi.fn((array) => array[0]), // always return element at index 0
  };
});

const fruitData = {
  id: 1,
  name: 'Mango',
  pricing: {
    price_per_unit: 244,
  },
  categories: ['category1', 'category3'],
};

const renderProductDetails = (props = {}) => {
  return render(
    <ProductDetails
      open={true}
      toggleOpen={mockToggleOpen}
      fruitData={fruitData}
      closeProductDetails={mockCloseProductDetails}
      {...props}
    />
  );
};

describe('ProductDetails', () => {
  it('should render ProductDetails to match snapshot', () => {
    const { container } = renderProductDetails();

    expect(container).toMatchSnapshot();
  });

  it('should render product details', () => {
    renderProductDetails();

    expect(screen.getByText(/mango/i)).toBeInTheDocument();
    expect(screen.getByText(/category(1|3)/i)).toBeInTheDocument();
  });

  it('clicking the backdrop should call closeProductDetails', async () => {
    const user = userEvent.setup();
    renderProductDetails();

    const backdrop = screen.getByTestId('backdrop');

    await user.click(backdrop);

    expect(mockCloseProductDetails).toHaveBeenCalled();
  });

  it('should call closeProductDetails when close button is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetails();

    const closeBtn = screen.getByTestId('close button');
    await user.click(closeBtn);
    expect(mockCloseProductDetails).toHaveBeenCalled();
  });
});
