import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SideMenu from '@/components/SideMenu';
import OnSaleSection from '@/components/OnSaleSection';
import InSeasonSection from '../components/InSeasonSection.jsx';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
`;

export default function HomePage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  function toggleSideMenuOpen() {
    setSideMenuOpen(!sideMenuOpen);
  }

  return (
    <HomePageWrapper>
      <Header toggleSideMenuOpen={toggleSideMenuOpen} />
      <SideMenu open={sideMenuOpen} toggleOpen={toggleSideMenuOpen} />
      <HeroSection />
      <OnSaleSection />
      <InSeasonSection />
    </HomePageWrapper>
  );
}
