import styled from 'styled-components';
import { bool, func, number, shape, string } from 'prop-types';
import Placeholder from 'react-image-filler';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus, mdiTrashCan } from '@mdi/js';

const CartItemWrapper = styled.div`
  & {
    border: 1.5px solid #333a11;
    display: flex;
    padding: 8px;
    flex-direction: column;
    gap: 8px;
    max-width: 300px;
    flex: 0 1 300px;
  }

  .icon-fruit-details {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .name {
    font-size: 1.8rem;
    font-weight: bold;
  }

  .total-price {
    font-size: 2rem;
    font-weight: bold;
  }

  .unit-price {
    font-size: 1.2rem;
    font-style: italic;
  }

  .controls {
    display: flex;
    flex-direction: column;
  }

  .details-controls-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex: 1;
  }

  .quantity-container button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }

  .quantity-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex: 1;
    align-self: flex-end;
  }

  .quantity-container span {
    margin: 0 auto;
    min-width: 5ch;
    text-align: center;
  }

  .delete-btn {
    outline: none;
    border: none;
    background-color: red;
    padding: 6px 8px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 4px;
    font-size: 1rem;
    align-self: flex-end;
    margin: 3px;
  }

  .delete-btn:hover {
    border: 1.4px solid #ddd;
  }
`;

export default function CartItem({
  fruitData,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const { id, pricing, cart_quantity } = fruitData;
  const { price_per_unit } = pricing;

  return (
    <CartItemWrapper className="cart-item-container">
      <div className="icon-fruit-details">
        <div className="fruit-icon-container">
          <Placeholder width={75} height={100} />
        </div>
        <div className="details">
          <p className="name">{name}</p>
          <p className="unit-price">
            Unit Price:{' '}
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(pricing.price_per_unit)}
          </p>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              removeFromCart(id);
            }}
          >
            <Icon path={mdiTrashCan} color="white" size={1.24} />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <div className="controls">
        <p className="total-price">
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(cart_quantity * price_per_unit)}
        </p>
        <div
          className="quantity-container"
          role="group"
          aria-label="Change product quantity"
        >
          <button
            type="button"
            onClick={() => {
              decreaseQuantity(id);
            }}
            aria-label="Decrease quantity"
          >
            <Icon path={mdiMinus} size={1.2} />
          </button>

          <span>{cart_quantity}</span>

          <button
            type="button"
            onClick={() => {
              increaseQuantity(id);
            }}
            aria-label="Increase quantity"
          >
            <Icon path={mdiPlus} size={1.2} />
          </button>
        </div>
      </div>
    </CartItemWrapper>
  );
}

CartItem.propTypes = {
  fruitData: shape({
    imageAlt: string,
    imageSrc: string,
    name: string,
    price: number,
    wishlist: bool,
    category: string,
    cart_quantity: number,
  }),
  increaseQuantity: func,
  decreaseQuantity: func,
  removeFromCart: func,
};
