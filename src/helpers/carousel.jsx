import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import styled from 'styled-components';
import { node, bool, number, arrayOf } from 'prop-types';

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 400px; /* adjust as needed */
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-out;
  transform: ${({ curr }) => `translateX(-${curr * 100}%)`};
  height: 100%;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

const Nav = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const NavButton = styled.button`
  padding: 0.25rem;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.8);
  color: #1f2937;
  transition: background 0.2s;
  &:hover {
    background: #ffffff;
  }
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0;
  left: 0;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s;
  ${({ active }) => active && `transform: scale(1.4);`}
`;

export default function Carousel({
  children,
  autoSlide = true,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);
  const length = children.length;

  const prev = () => setCurr((c) => (c === 0 ? length - 1 : c - 1));
  const next = () => setCurr((c) => (c === length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(() => {
      setCurr((c) => (c === length - 1 ? 0 : c + 1));
    }, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, length]);

  return (
    <CarouselContainer>
      <CarouselTrack curr={curr}>
        {children.map((child, i) => (
          <Slide key={i}>{child}</Slide>
        ))}
      </CarouselTrack>

      <Nav>
        <NavButton onClick={prev}>
          <ChevronLeft size={40} />
        </NavButton>
        <NavButton onClick={next}>
          <ChevronRight size={40} />
        </NavButton>
      </Nav>

      <DotsWrapper>
        <Dots>
          {children.map((_, i) => (
            <Dot key={i} active={curr === i} />
          ))}
        </Dots>
      </DotsWrapper>
    </CarouselContainer>
  );
}

Carousel.propTypes = {
  autoSlide: bool,
  autoSlideInterval: number,
  children: arrayOf(node).isRequired,
};
