// import { } from '@mdi/js';
import Icon from '@mdi/react';
import baseStyles from '../styles/base.module.css';
import classNames from 'classnames';
import styled from 'styled-components';
import HeroImageLarge from '../assets/hero-image-large.jpeg';
import HeroImage from '../assets/hero-image.jpeg';

const HeroSectionWrapper = styled.section`
  & {
    min-height: 100%;
    grid-area: 2 / 1;
  }

  & .bg-image {
    /* The image used */
    background-image: url(${HeroImage});
    /* Add the blur effect */
    filter: blur(1.5px);
    -webkit-filter: blur(1.5px); /* Full height */
    height: 100%; /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & .bg-text {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
  }

  @media screen and (min-width: 768px) {
    & .bg-image {
      /* The image used */
      background-image: url(${HeroImageLarge});
    }
  }
`;

export default function HeroSection() {
  return (
    <HeroSectionWrapper>
      <div className="bg-image"></div>
      <div className="bg-text">
        <h2>Lorem Ipsum</h2>
      </div>
    </HeroSectionWrapper>
  );
}
