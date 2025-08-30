import { string, number, bool } from 'prop-types';
import className from 'classnames';
import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import ImageFiller from 'react-image-filler';
import Icon from '@mdi/react';
import { mdiCart, mdiHeart } from '@mdi/js';
import classNames from 'classnames';

const ProductCardWrapper = styled.div`
  & {
    position: relative;
    border: 1px solid #eee;
    width: 100%;
  }

  .image-container {
    user-select: none;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* TODO: make wishlist clickable and prettier */
  /* TODO: consider removing wishlist */
  .wishlist-container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    border: 1px solid #eee;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.45rem;
    color: #eee;
    background-color: white;
    outline: none;
    cursor: pointer;
  }

  .wishlist-container:hover,
  .wishlist-container:active {
    color: #fc073c96;
  }

  .wishlist-container:focus {
    outline: 2px solid #fc073c96;
    outline-offset: 1px;
    color: #fc073c96;
  }

  .wishlist-container button {
    background-color: inherit;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 0.8rem;
  }

  .product-details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

  /* TODO: COMPLETE CART BTN STYLING */
  .add-to-cart {
    align-self: flex-end;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 0.5rem 1rem;
    outline: none;
    border: 3px solid green;
    background-color: white;
    border-radius: 5px;
    color: green;
    font-weight: bold;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .add-to-cart:hover,
  .add-to-cart:focus {
    color: white;
    background-color: green;
  }
`;

export default function ProductCard({
  imageSrc,
  imageAlt,
  name,
  price,
  wishlist,
  category,
}) {
  return (
    <ProductCardWrapper>
      <div className="image-container">
        {/**TODO: USE PROPER IMAGE, MAKE IMAGE A LINK */}
        {/* <img src={imageSrc} alt={imageAlt} /> */}
        <ImageFiller width={150} height={150} alt={imageAlt} />
        <button
          className={classNames(
            baseStyles.uAlignCenter,
            baseStyles.uFlex,
            baseStyles.uJustifyCenter,
            'wishlist-container'
          )}
        >
          <Icon path={mdiHeart} size={1.75} />
        </button>
      </div>
      <div className="product-details">
        <div className="title">
          {/**TODO: MAKE CATEGORY A LINK TO CATEGORIES PAGE */}
          {/**TODO: MAKE NAME A LINK TO THE ITEM PAGE */}
          <p className="category">{category}</p>
          <p className="name">{name}</p>
        </div>
        <p className="price">
          {/* // TODO: MAKE PRICING ACCOUNT FOR UNITS STYLE */}
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(price)}
        </p>
        <button type="button" className="add-to-cart">
          <Icon path={mdiCart} size={1.5} />
          <span>Add to cart</span>
        </button>
      </div>
    </ProductCardWrapper>
  );
}

ProductCard.propTypes = {
  imageAlt: string,
  imageSrc: string,
  name: string,
  price: number,
  wishlist: bool,
  category: string,
};
