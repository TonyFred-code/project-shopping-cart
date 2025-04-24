import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SideMenu from '@/components/SideMenu';
import OnSaleSection from '@/components/OnSaleSection';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  /*
  @media screen and (min-width: 768px) {
    & {
      grid-template-rows: auto 1fr;
    }
  }

  @media screen and (min-width: 1024px) {
    & {
      grid-template-rows: auto 1fr;
    }
  } */
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
    </HomePageWrapper>
  );
}
