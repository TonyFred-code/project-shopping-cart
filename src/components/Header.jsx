import { mdiCart, mdiMagnify, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
  & {
    border-bottom: 1.5px solid #74bf0482;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
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
      justify-content: center;
    }

    li > * {
      width: 100%;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      padding: 0.5rem 0;
      border-bottom: 1.5px solid #74bf04;
    }

    li > *:hover {
      font-weight: bold;
      border-color: #fff;
    }
  }
`;

export default function Header({ toggleSideMenuOpen }) {
  return (
    <HeaderWrapper
      className={classNames(
        baseStyles.uFlex,
        baseStyles.uFlexCol,
        baseStyles.uGap1r
      )}
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
          <li>
            <span>categories</span>
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
  toggleSideMenuOpen: PropTypes.func,
};
