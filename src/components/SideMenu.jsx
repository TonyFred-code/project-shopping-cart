import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import Icon from '@mdi/react';
import {
  mdiHeartCircle,
  mdiSale,
  mdiFruitCherries,
  mdiStore,
  mdiCalendarStarFourPoints,
  mdiGithub,
  mdiChevronUp,
} from '@mdi/js';
import CATEGORIES from '../helpers/categories.json';
import { useState } from 'react';

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
    { label: 'All Products', icon: mdiStore, dropDown: false },
    { label: 'Categories', icon: mdiFruitCherries, dropDown: true },
    { label: 'On Sale', icon: mdiSale, dropDown: false },
    { label: 'In Season', icon: mdiCalendarStarFourPoints, dropDown: false },
    { label: 'Wishlist', icon: mdiHeartCircle, dropDown: false },
  ];

  return (
    <SideMenuWrapper $open={open} $subCategoryOpen={subCategoryOpen}>
      <div className="content">
        <header>
          <h1 className={classNames(baseStyles.fontQuicksandBold)}>
            fruit.era
          </h1>
        </header>
        <nav>
          <ul>
            {navItems.map((item, index) => {
              if (!item.dropDown) {
                return (
                  <li key={index}>
                    <div
                      className={classNames(
                        baseStyles.uFlex,
                        baseStyles.uAlignCenter,
                        baseStyles.uGapD5r,
                        baseStyles.uCursorPointer,
                        baseStyles.uPadding1r
                      )}
                    >
                      <Icon path={item.icon} size={1.5} />
                      <span>{item.label}</span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={index} className="dropdown">
                  <header
                    onClick={toggleSubCategoryOpen}
                    className={classNames(
                      baseStyles.uFlex,
                      baseStyles.uAlignCenter,
                      baseStyles.uGapD5r,
                      baseStyles.uJustifySpaceBetween,
                      baseStyles.uCursorPointer,
                      baseStyles.uPadding1r
                    )}
                  >
                    <div
                      className={classNames(
                        baseStyles.uFlex,
                        baseStyles.uAlignCenter,
                        baseStyles.uGapD5r
                      )}
                    >
                      <Icon path={item.icon} size={1.5} />
                      <span>{item.label}</span>
                    </div>
                    <Icon
                      path={mdiChevronUp}
                      className="caret"
                      size={1.5}
                      rotate={subCategoryOpen ? 0 : 180}
                    />
                  </header>
                  <div className="dropdown-content">
                    <div>
                      {CATEGORIES.map((catItem) => {
                        const { name, id } = catItem;
                        return (
                          <span key={id} className="dropdown-item">
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
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
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
};
