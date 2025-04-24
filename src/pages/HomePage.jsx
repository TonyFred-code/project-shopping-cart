import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SideMenu from '@/components/SideMenu';
import OnSaleSection from '@/components/OnSaleSection';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
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
      <div className="wrapper">
        <OnSaleSection />
      </div>
    </HomePageWrapper>
  );
}
