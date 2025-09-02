import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { useState } from 'react';
import LayoutWrapper from '@/components/Layout.jsx';
import { array } from 'prop-types';
import useFruitsData from '@/helpers/useFruitsData.jsx';
import useCategoriesData from '@/helpers/useCategoriesData.jsx';
import classNames from 'classnames';
import ProductCard from '@/components/ProductCard.jsx';
import { ThreeDots } from 'react-loader-spinner';
import randomArrayElement from '@/helpers/randomArrayElement.js';
import sortBy from 'sort-by';
import arrayShuffle from 'array-shuffle';
import Icon from '@mdi/react';
import {
  mdiShuffleVariant,
  mdiSortAlphabeticalAscending,
  mdiSortAlphabeticalDescending,
} from '@mdi/js';

const ProductsPageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 2.4rem;
    color: rgba(0, 0, 0, 0.65);
    width: min(75%, 200px);
  }

  .header-container {
    border-top: 2px solid rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
    border-right: 2px solid rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    max-width: 500px;
    padding: 1rem;

    width: 100%;
  }

  .order-option-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .order-by {
    padding: 1rem 1.4rem;
  }

  aside {
    display: none;
  }

  .loading-container {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
  }

  .products-container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem auto;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  }

  @media screen and (min-width: 1024px) {
    .products-page-main {
      display: flex;
    }
    aside {
      display: flex;
      flex: 1;
    }

    .products-container,
    .loading-container {
      flex: 3;
    }
  }
`;

export default function ProductsPage() {
  const [sortOption, setSortOption] = useState('random');
  const fruitsData = useFruitsData();
  const categoriesData = useCategoriesData();
  let displayedData = arrayShuffle(fruitsData.fruits);
  let iconChoice = <Icon path={mdiShuffleVariant} size={1.3} />;

  switch (sortOption) {
    case 'desc-a-z':
      displayedData.sort(sortBy('-name'));
      iconChoice = <Icon path={mdiSortAlphabeticalDescending} size={1.3} />;
      break;
    case 'ascending-a-z':
      displayedData.sort(sortBy('name'));
      iconChoice = <Icon path={mdiSortAlphabeticalAscending} size={1.3} />;
      break;
    // TODO: add fix sorting by pricing
    // case 'price-high-to-low':
    //   displayedData.sort(sortBy('pricing.price_per_unit'));
    //   break;
    // case 'price-low-to-high':
    //   displayedData.sort(sortBy('-pricing.price_per_unit'));
    //   break;
    default:
      displayedData = arrayShuffle(fruitsData.fruits);
      break;
  }

  if (fruitsData.error || categoriesData.error) {
    return (
      <LayoutWrapper>
        <div>Something went wrong with the data fetching</div>
      </LayoutWrapper>
    );
  }

  return (
    <ProductsPageWrapper>
      <LayoutWrapper>
        <div className="header-container">
          <h1 className={(classNames(baseStyles.fontQuicksandBold), 'title')}>
            SHOP
          </h1>
          <div className="order-option-container">
            {iconChoice}
            <select
              name="order-by"
              className="order-by"
              value={sortOption}
              onChange={(event) => {
                setSortOption(event.target.value);
              }}
            >
              <option value="random">Default Sorting (RANDOM)</option>
              <option value="desc-a-z">Alphabetically (descending)</option>
              <option value="ascending-a-z">Alphabetically (ascending)</option>
              {/* <option value="price-low-to-high">
                Sort by price (Low to High)
              </option>
              <option value="price-high-to-low">
                Sort by price: (High to Low)
              </option> */}
            </select>
          </div>
        </div>
        <main className="products-page-main">
          {/* <aside></aside> */}
          {categoriesData.loading || fruitsData.loading ? (
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
            <div className="products-container">
              {displayedData.map((fruit) => {
                return (
                  <ProductCard
                    key={fruit.id}
                    imageAlt={fruit.name}
                    imageSrc={fruit.image_url}
                    name={fruit.name}
                    price={fruit.pricing.price_per_unit}
                    category={randomArrayElement(fruit.categories)}
                    type="sale"
                    //TODO: figure out a way to create sale product card
                  />
                );
              })}
            </div>
          )}
        </main>
      </LayoutWrapper>
    </ProductsPageWrapper>
  );
}

ProductsPage.propTypes = {
  fruitsData: array,
  categoriesData: array,
};
