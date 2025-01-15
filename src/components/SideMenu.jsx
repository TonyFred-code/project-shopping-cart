import styled from 'styled-components';
import PropTypes from 'prop-types';

const SideMenuWrapper = styled.section`
  & {
    width: ${(props) => (props.open ? '100%' : '0px')};
    z-index: 10;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    transition: width linear 0.3s;
  }

  & .backdrop {
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    filter: blur(5px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
  }

  & .content {
    width: 75%;
    background-color: #fff;
    height: 100%;
  }
`;

export default function SideMenu({ open, toggleOpen }) {
  return (
    <SideMenuWrapper open={open}>
      <div className="content"></div>
      <div className="backdrop" onClick={toggleOpen}></div>
    </SideMenuWrapper>
  );
}

SideMenu.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
};
