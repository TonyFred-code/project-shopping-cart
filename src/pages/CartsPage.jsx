import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import Icon from '@mdi/react';
import { mdiCart, mdiShopping } from '@mdi/js';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer.jsx';
import useCartItems from '@/helpers/useCartItems.jsx';
import useFruitsData from '@/helpers/useFruitsData.jsx';

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

  button:hover,
  button:active {
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
  const cartItemsData = useCartItems();
  const fruitsData = useFruitsData();
  if (fruitsData.error) {
    return <div>Failed to Fetch</div>;
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
        <section>
          {cartItemsData.cartItems.length === 0 ? (
            <div className="empty-cart">
              <h1>Your cart is empty.</h1>
              <p>
                It appears you have no items in your cart. Go ahead and explore
                the shop for choice fruits
              </p>
            </div>
          ) : (
            <div className="non-empty-cart">
              {cartItemsData.cartItems.map((cartItem) => {
                const { cart_quantity, name, pricing, id } = cartItem;

                return (
                  <div key={id}>
                    {name} {pricing.price_per_unit} {cart_quantity}
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <footer></footer>
      </main>
      <Footer />
    </CartsWrapper>
  );
}
