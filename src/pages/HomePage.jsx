import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import SideMenu from '@/components/SideMenu.jsx';
import OnSaleSection from '@/components/OnSaleSection.jsx';
import InSeasonSection from '@/components/InSeasonSection.jsx';
import useFruitsData from '@/helpers/useFruitsData.jsx';
import { fruitInSeason, fruitOnSale } from '@/helpers/fruits-helper.js';
import useCategoriesData from '@/helpers/useCategoriesData.jsx';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

export default function HomePage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const fruitsData = useFruitsData();
  const categoriesData = useCategoriesData();

  const onSaleFruits = fruitsData.fruits.filter((d) => {
    return fruitOnSale(d);
  });

  const inSeasonFruits = fruitsData.fruits.filter((d) => {
    return fruitInSeason(d);
  });

  function toggleSideMenuOpen() {
    setSideMenuOpen(!sideMenuOpen);
  }

  // ! REFACTOR FAILED FETCH
  if (fruitsData.error) return <div> FAILED TO FETCH</div>;

  return (
    <HomePageWrapper>
      <Header
        toggleSideMenuOpen={toggleSideMenuOpen}
        categories={categoriesData.categories}
      />
      <SideMenu
        open={sideMenuOpen}
        toggleOpen={toggleSideMenuOpen}
        categories={categoriesData.categories}
      />
      <HeroSection />
      {/*TODO: create about us mini section */}
      <OnSaleSection fruits={onSaleFruits} loading={fruitsData.loading} />
      <InSeasonSection fruits={inSeasonFruits} loading={fruitsData.loading} />
      {/*TODO: create a shop by categories section */}
      {/*TODO: create footer section */}
    </HomePageWrapper>
  );
}
