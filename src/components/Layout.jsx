import useCategoriesData from '@/helpers/useCategoriesData.jsx';
import { useState } from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import SideMenu from './SideMenu.jsx';
import Footer from './Footer.jsx';
import { node } from 'prop-types';

const Wrapper = styled.div`
  & {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  main {
    margin-top: 55px;
    flex: 1;
  }

  @media screen and (min-width: 768px) {
    main {
      margin-top: 65px;
    }
  }
  /* 
  @media screen and (min-width: 768px) {
    main {
      margin-top: 85px;
    }
  } */

  @media screen and (min-width: 1024px) {
    main {
      margin-top: 140px;
    }
  }
`;

export default function LayoutWrapper({ children }) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const categoriesData = useCategoriesData();

  function toggleSideMenuOpen() {
    setSideMenuOpen(!sideMenuOpen);
  }

  return (
    <Wrapper>
      <Header
        toggleSideMenuOpen={toggleSideMenuOpen}
        // toggleSearchMenuOpen={toggleSearchMenuOpen}
        categories={categoriesData.categories}
      />
      <main>{children}</main>
      <SideMenu
        open={sideMenuOpen}
        toggleOpen={toggleSideMenuOpen}
        categories={categoriesData.categories}
      />
      <Footer />
    </Wrapper>
  );
}

LayoutWrapper.propTypes = {
  children: node.isRequired,
};
