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
  stock: 5,
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
    expect(screen.getByRole('spinbutton')).toHaveValue(1); // 1 is default quantity
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

  it('should increase quantity to be added to cart when increase quantity button is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetails();
    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    await user.click(increaseBtn);

    expect(screen.getByRole('spinbutton')).toHaveValue(2);
  });

  it('should increase quantity to be added to cart when increase quantity button is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetails();
    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    await user.click(decreaseBtn);

    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('should show price as a multiple of quantity selected', async () => {
    const user = userEvent.setup();
    renderProductDetails();
    const totalPriceEl = screen.getByTestId('total-price');

    expect(totalPriceEl).toHaveTextContent(
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(fruitData.pricing.price_per_unit * 1)
    );

    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    await user.click(increaseBtn);

    expect(totalPriceEl).toHaveTextContent(
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(fruitData.pricing.price_per_unit * 2)
    );
  });

  it.todo('should call handleAddToCart on clicking confirm button');
});
