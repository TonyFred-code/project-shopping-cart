import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { bool, exact, func, object, shape, string } from 'prop-types';

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
    gap: 2rem;
    overflow: auto;
    padding: 2rem 0;
  }

  h1 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    width: min(85%, 320px);
    text-transform: capitalize;
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
`;

export default function ProductDetails({ open, toggleOpen, fruitData }) {
  const { name } = fruitData;

  return (
    <ProductDetailsWrapper $open={open}>
      <div className="content">
        <h1>{name} Product Details</h1>
        <div className="product-details">{fruitData.toString()}</div>
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
