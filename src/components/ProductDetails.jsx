import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { bool, func, object } from 'prop-types';
import Placeholder from 'react-image-filler';
import classNames from 'classnames';
import Icon from '@mdi/react';
import { mdiCartPlus, mdiClose, mdiMinus, mdiPlus } from '@mdi/js';
import { useState } from 'react';

const ProductDetailsWrapper = styled.div`
  /* TODO: use proper dialog element */
  & {
    z-index: 10;
    width: ${(props) => (props.$open ? '100%' : '0px')};
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width linear 0.3s; // todo: improve show and hiding animation
    overflow: hidden;
    border: none;
  }

  &::backdrop {
    background-color: #504d4d;
  }

  button {
    cursor: pointer;
  }

  .content {
    width: min(100%, 320px);
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    padding: 2rem 0;
  }

  header {
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }

  .header {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    width: min(85%, 320px);
    text-transform: capitalize;
    margin-right: auto;
  }

  .close-btn {
    border: none;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fruit-info {
    border-bottom: 1px solid #eee;
  }

  .img {
    width: min(80%, 300px);
    height: auto;
    aspect-ratio: 1;
  }

  .category {
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 700;
    color: #ccc;
  }

  .name {
    color: green;
    text-transform: capitalize;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .price {
    font-weight: bold;
    color: #111;
  }

  .icon-text {
    display: none;
  }

  .quantity-add-container {
    display: flex;
  }

  .quantity-container button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 1rem;
  }

  .quantity-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .quantity-container input {
    width: 5ch;
    text-align: center;
    font-size: 1.25rem;
    border: none;
    font-weight: bold;
    height: 100%;
    outline: none;
    pointer-events: none;
  }

  .add-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .add-container button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
  }

  .price-total {
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
    color: #504d4d;
    display: flex;
    align-items: center;
  }

  .price-total .total {
    color: black;
    flex: 1;
    text-align: end;
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    filter: blur(5px);
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
  }

  .limit-warning {
    color: red;
    font-weight: bold;
    font-style: italic;
    font-size: 1rem;
  }

  @media screen and (min-width: 425px) {
    .quantity-add-container {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 768px) {
    .img {
      /* width: min(85%) ; */
    }

    .content {
      width: min(50%, 500px);
    }

    .add-container button {
      text-transform: uppercase;
      color: #111;
      font-weight: bold;
      gap: 1rem;
      height: 100%;
    }

    .icon-text {
      display: initial;
    }

    .quantity-add-container {
      flex-direction: row;
    }
  }
`;

export default function ProductDetails({
  open,
  fruitData,
  closeProductDetails,
}) {
  const [quantity, setQuantity] = useState(1);
  const [showMaxWarning, setShowMaxWarning] = useState(false);
  const [showMinWarning, setShowMinWarning] = useState(false);

  const { name, pricing, categories, stock } = fruitData;

  function hideWarnings() {
    setShowMaxWarning(false);
    setShowMinWarning(false);
  }

  function handleQuantityIncrement() {
    const val = quantity + 1;
    if (val <= stock) {
      setQuantity(val);
      hideWarnings();
    } else {
      setShowMaxWarning(true);
    }
  }

  function handleQuantityDecrement() {
    const val = quantity - 1;
    if (val >= 0) {
      setQuantity(val);
      hideWarnings();
    } else {
      setShowMinWarning(true);
    }
  }

  const { price_per_unit } = pricing;

  return (
    <ProductDetailsWrapper $open={open}>
      <div className="content">
        <header>
          <h1 className={classNames(baseStyles.uPadding1r)}>Product Details</h1>
          <button
            type="button"
            className="close-btn"
            onClick={closeProductDetails}
            data-testid="close button"
          >
            <Icon path={mdiClose} size={1.3} />
          </button>
        </header>
        <div className="product-details">
          <div className="header">
            <div className="fruit-info">
              <Placeholder width={150} height={150} className="img" />
              <p className="name">{name}</p>
              <p>
                <span className="price">
                  {/* // TODO: MAKE PRICING ACCOUNT FOR UNITS STYLE */}
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(price_per_unit)}
                </span>
              </p>
            </div>
            <div className="price-total">
              <span>total:</span>
              <span className="total">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(price_per_unit * quantity)}
              </span>
            </div>
            <div className="quantity-add-container">
              <div
                className="quantity-container"
                role="group"
                aria-label="Change product quantity"
              >
                <button
                  type="button"
                  onClick={handleQuantityDecrement}
                  aria-label="Decrease quantity"
                >
                  <Icon path={mdiMinus} size={1.2} />
                </button>

                <input
                  type="number"
                  value={quantity}
                  readOnly
                  aria-live="polite"
                  name="quantity"
                />

                <button
                  type="button"
                  onClick={handleQuantityIncrement}
                  aria-label="Increase quantity"
                >
                  <Icon path={mdiPlus} size={1.2} />
                </button>
              </div>

              <div className="add-container">
                <button type="button">
                  <Icon path={mdiCartPlus} color="inherit" size={1.2} />
                  <span className="icon-text">Confirm</span>
                </button>
              </div>
            </div>
            {(showMaxWarning || showMinWarning) && (
              <span className="limit-warning">
                {showMaxWarning && 'Maximum '}
                {showMinWarning && 'Minimum '}
                limit reached
              </span>
            )}
            <p className="category">CATEGORIES: {categories.join(',')}</p>
          </div>
          <div></div>
        </div>
      </div>
      <div
        className="backdrop"
        data-testid="backdrop"
        onClick={closeProductDetails}
      ></div>
    </ProductDetailsWrapper>
  );
}

ProductDetails.propTypes = {
  fruitData: object,
  open: bool,
  closeProductDetails: func,
  toggleOpen: func,
};
