import {
  mdiCalendarStarFourPoints,
  mdiGithub,
  mdiHeartCircle,
  mdiSale,
  mdiStore,
} from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { bool, func } from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { Link } from 'react-router-dom';

const SideMenuWrapper = styled.section`
  & {
    width: ${(props) => (props.$open ? '100%' : '0px')};
    z-index: 10;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width linear 0.3s;
    overflow: hidden;
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
  }

  .content {
    width: 75%;
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: auto;
  }

  h1 {
    padding: 1rem;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.3);
    max-width: 300px;
  }

  li > *:first-child {
    width: 100%;
  }

  li > *:first-child:hover {
    background-color: #ddd;
  }

  .dropdown {
    align-items: flex-start;
    flex-direction: column;
  }

  .dropdown-content {
    height: ${(props) => (props.$subCategoryOpen ? '175px' : '0px')};
    overflow: hidden auto;
    transition: all 0.35s ease-in-out;
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .dropdown-content > * {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
  }

  .dropdown-item {
    border-bottom: 1.3px solid #eee;
    display: inline-block;
    width: 65%;
    cursor: pointer;
    padding: 0.5rem;
  }

  .dropdown-item:hover {
    background-color: #eee;
  }

  .caret {
    transition: all 0.35s ease-in-out;
  }

  .copyright {
    margin-top: auto;
    font-size: 1rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.3);
    padding: 0.8rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    li {
      width: 60%;
    }
  }

  @media screen and (min-width: 1024px) {
    & {
      display: none;
    }
  }
`;

export default function SideMenu({ open, toggleOpen }) {
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);

  function toggleSubCategoryOpen() {
    setSubCategoryOpen(!subCategoryOpen);
  }

  const navItems = [
    { label: 'All Products', icon: mdiStore, to: '/shop' },
    { label: 'On Sale', icon: mdiSale, to: '/#on-sale' },
    {
      label: 'In Season',
      icon: mdiCalendarStarFourPoints,
      to: '/#in-season',
    },
    { label: 'Wishlist', icon: mdiHeartCircle, to: '/' },
  ];

  return (
    <SideMenuWrapper $open={open} $subCategoryOpen={subCategoryOpen}>
      <div className="content">
        <header>
          <h1 className={classNames(baseStyles.fontQuicksandBold)}>
            <Link to={'/'}>fruit.era</Link>
          </h1>
        </header>
        <nav>
          <ul>
            {navItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={classNames(
                      baseStyles.uFlex,
                      baseStyles.uAlignCenter,
                      baseStyles.uGapD5r,
                      baseStyles.uCursorPointer,
                      baseStyles.uPadding1r
                    )}
                    onClick={toggleOpen}
                  >
                    <Icon path={item.icon} size={1.5} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <footer className="copyright">
          <span>&copy; {new Date().getFullYear()}. All Rights Reserved</span>
          <a
            href="https://github.com/TonyFred-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon path={mdiGithub} size={1} />
          </a>
        </footer>
      </div>
      <div
        className="backdrop"
        onClick={() => {
          toggleOpen();
          toggleSubCategoryOpen();
        }}
      ></div>
    </SideMenuWrapper>
  );
}

SideMenu.propTypes = {
  open: bool,
  toggleOpen: func,
};
