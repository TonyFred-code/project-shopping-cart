import { mdiCart, mdiChevronUp, mdiMagnify, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { func } from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import CATEGORIES from '../helpers/categories.json';
import baseStyles from '../styles/base.module.css';

const HeaderWrapper = styled.header`
  & {
    border-bottom: 1.5px solid #74bf0482;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 3;
    grid-area: 1 / 1 / 1 / 1;
  }

  & > div {
    padding: 0.5rem;
  }

  h1 {
    font-size: 2.4rem;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.8rem;
  }

  button:hover,
  button:active {
    font-weight: bold;
  }

  button .btn-icon-text {
    display: none;
  }

  nav {
    display: none;
  }

  @media screen and (min-width: 768px) {
    button {
      width: auto;
      height: auto;
      border-bottom: 1.8px solid;
    }

    button .btn-icon-text {
      display: inline-block;
    }

    h1 {
      font-size: 2.67rem;
    }
  }

  @media screen and (min-width: 1024px) {
    & > div {
      padding: 0 1.5rem;
    }

    button {
      padding: 1rem;
    }

    .menu-btn {
      display: none;
    }

    nav {
      display: block;
    }

    ul {
      list-style-type: none;
      background-color: #74bf04;
      color: #fff;
    }

    li {
      font-size: 1.5rem;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    li > *:first-child {
      display: flex;
      text-align: center;
      cursor: pointer;
      padding: 0.5rem 0;
      border-bottom: 1.5px solid #74bf04;
      width: 65%;
    }

    li > *:first-child:hover {
      font-weight: bold;
      border-color: #fff;
    }

    .dropdown {
      align-items: flex-start;
      flex-direction: column;
      position: relative;
    }

    .dropdown-content {
      height: ${(props) => (props.$subCategoryOpen ? '175px' : '0px')};
      overflow: hidden auto;
      transition: all 0.35s ease-in-out;
      flex-direction: column;
      display: block;
      position: absolute;
      z-index: 2;
      left: 0;
      top: 100%;
      width: 75%;
    }

    .dropdown-content ul {
      display: flex;
      flex-direction: column;
    }

    .dropdown-content li {
      padding: 0.5rem;
      cursor: pointer;
    }

    .dropdown-content li:hover {
      font-weight: bold;
      border-color: #fff;
    }
  }
`;

export default function Header({ toggleSideMenuOpen }) {
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);

  function toggleSubCategoryOpen() {
    setSubCategoryOpen(!subCategoryOpen);
  }

  return (
    <HeaderWrapper
      className={classNames(
        baseStyles.uFlex,
        baseStyles.uFlexCol,
        baseStyles.uGap1r
      )}
      $subCategoryOpen={subCategoryOpen}
    >
      <div
        className={classNames(
          baseStyles.uFlex,
          baseStyles.uJustifySpaceBetween,
          baseStyles.uAlignCenter
        )}
      >
        <button
          type="button"
          className={classNames(baseStyles.uGapD3r, 'menu-btn')}
          onClick={toggleSideMenuOpen}
        >
          <Icon path={mdiMenu} size={1.35} />
          <span className="btn-icon-text">Menu</span>
        </button>

        <h1 className={classNames(baseStyles.fontQuicksandBold)}>fruit.era</h1>

        <div
          className={classNames(
            baseStyles.uFlex,
            baseStyles.uAlignCenter,
            baseStyles.uJustifySpaceBetween,
            baseStyles.uGap1r
          )}
        >
          <button type="button" className={classNames(baseStyles.uGapD3r)}>
            <Icon path={mdiCart} size={1.35} />
            <span className="btn-icon-text">Cart</span>
          </button>
          <button type="button" className={classNames(baseStyles.uGapD3r)}>
            <Icon path={mdiMagnify} size={1.35} />
            <span className="btn-icon-text">Search</span>
          </button>
        </div>
      </div>
      <nav>
        <ul
          className={classNames(
            baseStyles.uFlex,
            baseStyles.uPadding1r,
            baseStyles.uAlignCenter,
            baseStyles.uTextTransformCapitalize,
            baseStyles.uGap1r
          )}
        >
          <li>
            <span>shop</span>
          </li>
          <li className="dropdown">
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
                <span>Categories</span>
              </div>
              <Icon
                path={mdiChevronUp}
                className="caret"
                size={1.5}
                rotate={subCategoryOpen ? 0 : 180}
              />
            </header>
            <div className="dropdown-content">
              <ul>
                {CATEGORIES.map((catItem) => {
                  const { name, id } = catItem;
                  return (
                    <li key={id} className="dropdown-item">
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
          <li>
            <span>on sale</span>
          </li>
          <li>
            <span>in season</span>
          </li>
        </ul>
      </nav>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  toggleSideMenuOpen: func,
};
