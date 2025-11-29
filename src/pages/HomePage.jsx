import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeroSection from '@/components/HeroSection.jsx';
import OnSaleSection from '@/components/OnSaleSection.jsx';
import InSeasonSection from '@/components/InSeasonSection.jsx';
import useFruitsData from '@/helpers/useFruitsData.jsx';
import LayoutWrapper from '@/components/Layout.jsx';
import { useLocation } from 'react-router-dom';
import ProductDetails from '@/components/ProductDetails.jsx';
import useCartItems from '@/helpers/useCartItems.jsx';
import { CART_KEY } from '@/constants/cartsCache.js';
import randomInteger from 'random-int';
// import SearchMenu from '@/components/SearchMenu.jsx';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

export default function HomePage() {
  const location = useLocation();
  const fruitsData = useFruitsData();
  const [openItemDetails, setOpenItemDetails] = useState(false);
  const [displayedItemDetails, setDisplayedItemDetails] = useState(null);
  const cartItemsData = useCartItems();

  const onSaleFruits = fruitsData.fruits.filter((d) => d.onSale);

  const inSeasonFruits = fruitsData.fruits.filter((d) => d.inSeason);

  function handleShowItemDetails(fruitId) {
    const fruitData = fruitsData.fruits.filter(
      (data) => data.id === fruitId
    )[0];
    setDisplayedItemDetails(fruitData);
    setOpenItemDetails(true);
  }

  function handleAddToCart(quantity, fruitId) {
    cartItemsData.uploadCartItem(quantity, fruitId, cartItemsData.cartItems);
  }

  useEffect(() => {
    const LOADER_DURATION = randomInteger(500, 799);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    if (location.hash) {
      sleep(LOADER_DURATION).then(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [location]);

  useEffect(() => {
    return () => {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItemsData.cartItems));
    };
  }, [cartItemsData]);

  // ! REFACTOR FAILED FETCH
  if (fruitsData.error) return <div> FAILED TO FETCH</div>;

  return (
    <HomePageWrapper>
      <LayoutWrapper cartItemsCount={cartItemsData.cartItems.length}>
        <HeroSection />
        <OnSaleSection
          fruits={onSaleFruits}
          showProductDetails={handleShowItemDetails}
          loading={fruitsData.loading}
        />
        <InSeasonSection
          showProductDetails={handleShowItemDetails}
          fruits={inSeasonFruits}
          loading={fruitsData.loading}
        />
        {displayedItemDetails && (
          <ProductDetails
            fruitData={displayedItemDetails}
            open={openItemDetails}
            closeProductDetails={() => {
              setDisplayedItemDetails(null);
              setOpenItemDetails(false);
            }}
            confirmAddToCart={handleAddToCart}
          />
        )}
      </LayoutWrapper>
    </HomePageWrapper>
  );
}
