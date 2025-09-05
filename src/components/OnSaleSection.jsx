import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiFruitGrapes } from '@mdi/js';
import { array, bool, func } from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from './ProductCard.jsx';
import randomArrayElement from '@/helpers/randomArrayElement.js';

// TODO: Make this into a carousel

const OnSaleSectionWrapper = styled.section`
  & {
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0;
    scroll-margin-block: 60px;
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
    width: min(85%, 320px);
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

  @media screen and (min-width: 1024px) {
    & {
      scroll-margin-block: 140px;
    }
  }
`;

export default function OnSaleSection({ fruits, showProductDetails, loading }) {
  // console.log(showProductDetails);
  return (
    <OnSaleSectionWrapper id="on-sale">
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
                fruitData={fruit}
                showProductDetails={showProductDetails}
                //TODO: figure out a way to create sale product card
              />
            );
          })}
        </div>
      )}
    </OnSaleSectionWrapper>
  );
}

OnSaleSection.propTypes = {
  fruits: array,
  loading: bool,
  showProductDetails: func,
};
