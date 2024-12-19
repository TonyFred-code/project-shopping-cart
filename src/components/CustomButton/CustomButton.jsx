// CustomButton.jsx
import propTypes from 'prop-types';
import styled from 'styled-components';
import baseStyles from '@styles/base.module.css';
import classnames from 'classnames';

const Wrapper = styled.button`
  width: 90px;
  height: 40px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
`;

const CustomButton = ({ onClick }) => {
  return (
    <Wrapper
      onClick={onClick}
      className={classnames(
        baseStyles.btn,
        baseStyles.uAlignCenter,
        baseStyles.uFlex
      )}
    >
      Click me
    </Wrapper>
  );
};

CustomButton.propTypes = {
  onClick: propTypes.func,
};

export default CustomButton;
