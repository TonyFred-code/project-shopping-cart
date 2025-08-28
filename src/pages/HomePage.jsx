import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import SideMenu from '@/components/SideMenu.jsx';
import OnSaleSection from '@/components/OnSaleSection.jsx';
import InSeasonSection from '@/components/InSeasonSection.jsx';
import useFruitsData from '@/helpers/useFruitsData.jsx';
import { fruitOnSale } from '@/helpers/fruits-helper.js';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

export default function HomePage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const { error, loading, fruits } = useFruitsData();

  const onSaleFruits = fruits.filter((d) => {
    return fruitOnSale(d);
  });

  function toggleSideMenuOpen() {
    setSideMenuOpen(!sideMenuOpen);
  }

  // ! REFACTOR FAILED FETCH
  if (error) return <div> FAILED TO FETCH</div>;

  return (
    <HomePageWrapper>
      <Header toggleSideMenuOpen={toggleSideMenuOpen} />
      <SideMenu open={sideMenuOpen} toggleOpen={toggleSideMenuOpen} />
      <HeroSection />
      <OnSaleSection fruits={onSaleFruits} loading={loading} />
      <InSeasonSection />
    </HomePageWrapper>
  );
}
