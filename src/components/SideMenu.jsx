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
} from '@mdi/js';

const SideMenuWrapper = styled.section`
  & {
    width: ${(props) => (props.open ? '100%' : '0px')};
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
    gap: 1.5rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.3);
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
  const navItems = [
    { label: 'All Products', icon: mdiStore },
    { label: 'Categories', icon: mdiFruitCherries },
    { label: 'On Sale', icon: mdiSale },
    { label: 'In Season', icon: mdiCalendarStarFourPoints },
    { label: 'Wishlist', icon: mdiHeartCircle },
  ];

  return (
    <SideMenuWrapper open={open}>
      <div className="content">
        <header>
          <h1 className={classNames(baseStyles.fontQuicksandBold)}>
            fruit.era
          </h1>
        </header>
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Icon path={item.icon} size={1.5} />
                <span>{item.label}</span>
              </li>
            ))}
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
      <div className="backdrop" onClick={toggleOpen}></div>
    </SideMenuWrapper>
  );
}

SideMenu.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
};
