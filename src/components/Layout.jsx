import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import SideMenu from './SideMenu.jsx';
import Footer from './Footer.jsx';
import { node, number } from 'prop-types';

const Wrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .layout-main {
    margin-top: 55px;
    flex: 1;
  }

  @media screen and (min-width: 768px) {
    .layout-main {
      margin-top: 65px;
    }
  }
  /* 
  @media screen and (min-width: 768px) {
    .layout-main {
      margin-top: 85px;
    }
  } */

  @media screen and (min-width: 1024px) {
    .layout-main {
      margin-top: 140px;
    }
  }
`;

export default function LayoutWrapper({ children, cartItemsCount }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  function toggleSideMenuOpen() {
    setSideMenuOpen(!sideMenuOpen);
  }

  return (
    <Wrapper>
      <Header
        toggleSideMenuOpen={toggleSideMenuOpen}
        cartItemsCount={cartItemsCount}
      />
      <main className="layout-main">{children}</main>
      <SideMenu open={sideMenuOpen} toggleOpen={toggleSideMenuOpen} />
      <Footer />
    </Wrapper>
  );
}

LayoutWrapper.propTypes = {
  cartItemsCount: number,
  children: node.isRequired,
};
