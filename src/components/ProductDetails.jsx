import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { bool, exact, func, object, shape, string } from 'prop-types';
import Placeholder from 'react-image-filler';
import classNames from 'classnames';
import randomArrayElement from '@/helpers/randomArrayElement.js';
import Icon from '@mdi/react';
import { mdiCart, mdiMinus, mdiPlus } from '@mdi/js';
import { useState } from 'react';

const ProductDetailsWrapper = styled.div`
  & {
    width: ${(props) => (props.$open ? '100%' : '0px')};
    z-index: 10;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width linear 0.3s;
    overflow: hidden;
  }

  .content {
    width: min(75%, 600px);
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    padding: 2rem 0;
  }

  .header {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    width: min(85%, 320px);
    text-transform: capitalize;
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
    flex-direction: column;
  }

  .quantity button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 1rem;
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

  .quantity-input {
    max-width: 8ch;
    text-align: center;
    padding: 0.8rem;
    flex: 1.5;
    -webkit-appearance: textfield;
    appearance: textfield;
    height: 100%;
  }

  .price-total {
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: bold;
    color: #504d4d;
  }

  .price-total .total {
    color: black;
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

  @media screen and (min-width: 425px) {
    .quantity-add-container {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 768px) {
    .img {
      /* width: min(85%) ; */
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

export default function ProductDetails({ open, toggleOpen, fruitData }) {
  const [quantity, setQuantity] = useState(1);
  const [showMaxWarning, setShowMaxWarning] = useState(false);
  const [showMinWarning, setShowMinWarning] = useState(false);
  const { id, imageAlt, imageSrc, name, pricing, categories, stock } =
    fruitData;
  // const category = randomArrayElement(categories)

  function handleQuantityChange(e) {
    const val = Number(e.target.value);

    if (val <= stock) {
      setQuantity(val);
    } else {
      setShowMaxWarning(true);
    }
  }

  function handleQuantityIncrement() {
    const val = quantity + 1;
    if (val <= stock) {
      setQuantity(val);
    } else {
      setShowMaxWarning(true);
    }
  }

  function handleQuantityDecrement() {
    const val = quantity - 1;
    if (val >= 0) {
      setQuantity(val);
    } else {
      setShowMinWarning(true);
    }
  }

  const { price_per_unit } = pricing;
  return (
    <ProductDetailsWrapper $open={open}>
      <div className="content">
        <h1 className={classNames(baseStyles.uPadding1r)}>Product Details</h1>
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
              <div className="quantity">
                <button type="button" onClick={handleQuantityDecrement}>
                  <Icon path={mdiMinus} size={1.2} />
                </button>
                <input
                  type="number"
                  min={1}
                  name="quantity"
                  id="quantity"
                  inputMode="numeric"
                  value={quantity}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, ''); // remove non-digits
                    handleQuantityChange({ target: { value: cleaned } });
                  }}
                  className="quantity-input"
                />

                <button type="button" onClick={handleQuantityIncrement}>
                  <Icon path={mdiPlus} size={1.2} />
                </button>
              </div>
              <div className="add-container">
                <button type="button">
                  <Icon path={mdiCart} color="inherit" size={1.2} />
                  <span className="icon-text">Confirm</span>
                </button>
              </div>
            </div>
            <p className="category">CATEGORIES: {categories.join(',')}</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="backdrop" onClick={toggleOpen}></div>
    </ProductDetailsWrapper>
  );
}

ProductDetails.propTypes = {
  fruitData: object,
  open: bool,
  toggleOpen: func,
};
