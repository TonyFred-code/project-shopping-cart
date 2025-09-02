import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeroSection from '@/components/HeroSection.jsx';
import OnSaleSection from '@/components/OnSaleSection.jsx';
import InSeasonSection from '@/components/InSeasonSection.jsx';
import useFruitsData from '@/helpers/useFruitsData.jsx';
import { fruitInSeason, fruitOnSale } from '@/helpers/fruits-helper.js';
import useCategoriesData from '@/helpers/useCategoriesData.jsx';
import ShopByCategory from '@/components/ShopByCategory.jsx';
import LayoutWrapper from '@/components/Layout.jsx';
import { useLocation } from 'react-router-dom';
// import SearchMenu from '@/components/SearchMenu.jsx';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

export default function HomePage() {
  // const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const location = useLocation();
  const fruitsData = useFruitsData();
  const categoriesData = useCategoriesData();

  const onSaleFruits = fruitsData.fruits.filter((d) => {
    return fruitOnSale(d);
  });

  const inSeasonFruits = fruitsData.fruits.filter((d) => {
    return fruitInSeason(d);
  });

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // ! REFACTOR FAILED FETCH
  if (fruitsData.error || categoriesData.error)
    return <div> FAILED TO FETCH</div>;

  return (
    <HomePageWrapper>
      <LayoutWrapper>
        {/* TODO: turn search menu to its own page */}
        {/* <SearchMenu open={searchMenuOpen} toggleOpen={toggleSearchMenuOpen} /> */}
        <HeroSection />
        <OnSaleSection fruits={onSaleFruits} loading={fruitsData.loading} />
        <InSeasonSection fruits={inSeasonFruits} loading={fruitsData.loading} />
        {/*TODO: create a shop by categories section */}
        <ShopByCategory
          categories={categoriesData.categories}
          loading={categoriesData.loading}
        />
      </LayoutWrapper>
    </HomePageWrapper>
  );
}
