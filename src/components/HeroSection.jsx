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
    font-weight: 800;
    font-size: 2.35rem;
    /* font-family: ; */
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 80%;
    padding: 20px;
    text-align: center;
  }

  .bg-text p {
    font-size: 1.8rem;
    font-weight: 500;
  }

  @media screen and (min-width: 768px) {
    & .bg-image {
      /* The image used */
      background-image: url(${HeroImageLarge});
    }

    & .bg-text {
      font-size: 2.75rem;
    }
  }

  @media screen and (min-width: 1024px) {
    & .bg-text {
      font-size: 3.25rem;
    }
  }
`;

export default function HeroSection() {
  return (
    <HeroSectionWrapper>
      <div className="bg-image"></div>
      <div className="bg-text">
        <h2>Fresh from Our Farm to Your Table</h2>
        <p>Discover the finest fruits, grown with care, delivered with love.</p>
      </div>
    </HeroSectionWrapper>
  );
}
