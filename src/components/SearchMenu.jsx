import styled from 'styled-components';
import baseStyles from '../styles/base.module.css';
import { bool, func } from 'prop-types';
import { Form } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';

const SearchMenuWrapper = styled.div`
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
`;

export default function SearchMenu({ open, toggleOpen }) {
  return (
    <SearchMenuWrapper $open={open}>
      <div className="content">
        <Form role="search" id="search-form">
          <input
            type="search"
            name="q"
            id="search"
            placeholder="Search Products"
            aria-label="search"
          />
          <Icon aria-hidden hidden={true} path={mdiSync} size={1} spin={true} />
        </Form>
      </div>
      <div className="backdrop" onClick={toggleOpen}></div>
    </SearchMenuWrapper>
  );
}

SearchMenu.propTypes = {
  open: bool,
  toggleOpen: func,
};
