import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiFruitGrapes } from '@mdi/js';
import { array, bool } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from './ProductCard.jsx';

const OnSaleSectionWrapper = styled.section`
  & {
    display: flex;
    flex-direction: column;
    --width: 250px;
    margin: 1.5rem 0;
  }

  .loading-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & h2 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    max-width: 300px;
  }

  & .slider-container {
    overflow: hidden;
  }

  & .slider {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    position: relative;
    height: calc(var(--width) + 30px);
    min-width: calc(var(--width) * var(--quantity));
  }

  & .slider-item {
    flex: 0 0 auto;
    width: var(--width);
    height: var(--width);
    border-radius: 15px;
    position: absolute;
    left: 100%;
    animation-name: autoRun;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  & .slider:hover .slider-item {
    animation-play-state: paused;
  }

  & .slider-item .item-overlay {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    height: 0px;
    width: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    font-weight: 800;
  }

  & .slider-item:hover .item-overlay {
    display: flex;
    height: 100%;
    width: 100%;
    top: 0;
    transition: all 0.3s;
  }

  @keyframes autoRun {
    to {
      left: calc(var(--width) * -1);
    }
  }
`;

export default function OnSaleSection({ fruits, loading }) {
  const quantity = fruits.length;

  return (
    <OnSaleSectionWrapper style={{ '--quantity': quantity }}>
      <h2
        className={classNames(
          baseStyles.fontQuicksandBold,
          baseStyles.uPadding1r,
          baseStyles.uFlex,
          baseStyles.uAlignCenter,
          baseStyles.uGap1r
        )}
      >
        <Icon path={mdiFruitGrapes} size={2.5} />
        <span>On Sale Now</span>
      </h2>
      {loading ? (
        <div className="loading-container">
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
        <div className="slider-container">
          <div className="slider">
            {fruits.map((fruit, i) => (
              <div
                key={fruit.id}
                className="card slider-item"
                style={{
                  '--position': i + 1,
                  animationDelay:
                    'calc((10s / var(--quantity)) * (var(--quantity) - var(--position)) * -1)',
                }}
              >
                <ProductCard
                  imageAlt={fruit.name}
                  imageSrc={fruit.image_url}
                  name={fruit.name}
                  price={fruit.price}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </OnSaleSectionWrapper>
  );
}

OnSaleSection.propTypes = {
  fruits: array,
  loading: bool,
};
