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

  function toggleOpenItemDetails() {
    setOpenItemDetails(!openItemDetails);
  }

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
            toggleOpen={toggleOpenItemDetails}
            closeProductDetails={() => {
              setDisplayedItemDetails(null);
              setOpenItemDetails(false);
            }}
          />
        )}
      </LayoutWrapper>
    </HomePageWrapper>
  );
}
