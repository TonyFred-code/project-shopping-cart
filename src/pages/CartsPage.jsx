import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import Icon from '@mdi/react';
import {
  mdiCart,
  mdiMinus,
  mdiPlus,
  mdiSend,
  mdiShopping,
  mdiTrashCan,
} from '@mdi/js';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer.jsx';
import useCartItems from '@/helpers/useCartItems.jsx';
import { ThreeDots } from 'react-loader-spinner';
import Placeholder from 'react-image-filler';

const CartsWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  header {
    padding: 1rem 2rem;
    border-bottom: solid #ddd 1.5px;
    display: flex;
    justify-content: space-between;
  }

  header h1 {
    font-size: 2.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.8rem;
  }

  header button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.8rem;
  }

  header button:hover,
  header button:active {
    font-weight: bold;
    border-bottom: solid #ddd 1px;
  }

  button .btn-icon-text {
    display: none;
  }

  button a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  main section {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    max-width: 1300px;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    max-width: 75%;
    margin: 0 auto;
    text-align: center;
  }

  .empty-cart h1 {
    font-size: 2rem;
  }

  .non-empty-cart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-items-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .cart-item-container {
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

  .summary {
    align-self: center;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 155px;
  }

  .summary h3 {
    max-width: 80%;
    border-bottom: 1.5px solid black;
    text-align: center;
  }

  .summary button {
    margin-top: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    align-self: flex-end;
  }

  @media screen and (min-width: 768px) {
    button .btn-icon-text {
      display: inline-block;
    }
  }

  @media screen and (min-width: 968px) {
    header {
      border-bottom-width: 2px;
    }

    header h1 {
      font-size: 2.8rem;
    }

    header button {
      font-size: 1.5rem;
    }
  }
`;

export default function CartsPage() {
  const { cartItems, loading, uploadCartItem } = useCartItems();
  const cartTotalCost = cartItems.reduce((acc, { cart_quantity, pricing }) => {
    return acc + cart_quantity * pricing.price_per_unit;
  }, 0);
  const itemsCount = cartItems.length;

  function handleRemoveFromCart(fruitId) {
    const fruitData = cartItems.filter((cartItem) => {
      return cartItem.id === fruitId;
    })[0];

    uploadCartItem(-fruitData.cart_quantity, fruitData);
  }

  function handleQuantityIncrement(fruitId) {
    const fruitData = cartItems.filter((cartItem) => {
      return cartItem.id === fruitId;
    })[0];

    uploadCartItem(1, fruitData);
  }

  function handleQuantityDecrement(fruitId) {
    const fruitData = cartItems.filter((cartItem) => {
      return cartItem.id === fruitId;
    })[0];

    uploadCartItem(-1, fruitData);
  }

  return (
    <CartsWrapper>
      <header>
        <h1 className={classNames(baseStyles.fontQuicksandBold)}>
          <Icon path={mdiCart} color={'green'} size={1.35} />
          <span>Your Cart</span>
        </h1>
        <button
          type="button"
          className={classNames(baseStyles.uGapD3r, 'cart-btn')}
        >
          <Link to={'/shop'}>
            <Icon path={mdiShopping} color={'green'} size={1.35} />
            <span className="btn-icon-text">Back To Shop</span>
          </Link>
        </button>
      </header>
      <main>
        {loading ? (
          <div
            className={classNames(
              baseStyles.uFlex,
              baseStyles.uAlignCenter,
              baseStyles.uJustifyCenter
            )}
          >
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <section>
            {itemsCount === 0 ? (
              <div className="empty-cart">
                <h1>Your cart is empty.</h1>
                <p>
                  It appears you have no items in your cart. Go ahead and
                  explore the shop for choice fruits
                </p>
              </div>
            ) : (
              <div className="non-empty-cart">
                <div className="cart-items-container">
                  {cartItems.map((cartItem) => {
                    const { cart_quantity, name, pricing, id } = cartItem;

                    return (
                      <div key={id} className="cart-item-container">
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
                                handleRemoveFromCart(id);
                              }}
                            >
                              <Icon
                                path={mdiTrashCan}
                                color="white"
                                size={1.24}
                              />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                        <div className="controls">
                          <p className="total-price">
                            {new Intl.NumberFormat('en-NG', {
                              style: 'currency',
                              currency: 'NGN',
                            }).format(cart_quantity * pricing.price_per_unit)}
                          </p>
                          <div
                            className="quantity-container"
                            role="group"
                            aria-label="Change product quantity"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                handleQuantityDecrement(id);
                              }}
                              aria-label="Decrease quantity"
                            >
                              <Icon path={mdiMinus} size={1.2} />
                            </button>

                            <span>{cart_quantity}</span>

                            <button
                              type="button"
                              onClick={() => {
                                handleQuantityIncrement(id);
                              }}
                              aria-label="Increase quantity"
                            >
                              <Icon path={mdiPlus} size={1.2} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="summary">
                  <h3>Cart Summary</h3>
                  <p>
                    Total Cost:{' '}
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(cartTotalCost)}
                  </p>
                  <button type="button">
                    <Icon path={mdiSend} size={1.2} />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
        <footer></footer>
      </main>
      <Footer />
    </CartsWrapper>
  );
}
