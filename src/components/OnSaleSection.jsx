import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiFruitGrapes } from '@mdi/js';
import { array, bool } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from './ProductCard.jsx';
import randomArrayElement from '@/helpers/randomArrayElement.js';

// TODO: Make this into a carousel

const OnSaleSectionWrapper = styled.section`
  & {
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
  }

  .loading-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 2.5rem;
    border-bottom: 2px solid #ddd;
    border-top: 2px solid #ddd;
    width: min(75%, 300px);
  }
  .fruits-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    padding: 2rem;
  }

  .fruits-container > * {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
  }
`;

export default function OnSaleSection({ fruits, loading }) {
  return (
    <OnSaleSectionWrapper>
      <h2
        className={classNames(
          baseStyles.fontQuicksandBold,
          baseStyles.uPadding1r,
          baseStyles.uFlex,
          baseStyles.uAlignCenter,
          baseStyles.uGap1r
        )}
      >
        <Icon path={mdiFruitGrapes} color="green" size={2.5} />
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
        <div className="fruits-container">
          {fruits.map((fruit) => {
            return (
              <ProductCard
                key={fruit.id}
                imageAlt={fruit.name}
                imageSrc={fruit.image_url}
                name={fruit.name}
                price={fruit.pricing.price_per_unit}
                category={randomArrayElement(fruit.categories)}
              />
            );
          })}
        </div>
      )}
    </OnSaleSectionWrapper>
  );
}

OnSaleSection.propTypes = { fruits: array, loading: bool };
