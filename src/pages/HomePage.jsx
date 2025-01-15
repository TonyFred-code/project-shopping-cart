import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
  & {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: 45px 1fr;
  }

  @media screen and (min-width: 1024px) {
    & {
      grid-template-rows: 127px 1fr;
    }
  }
`;

export default function HomePage() {
  return (
    <HomePageWrapper>
      <Header />
      <HeroSection />
    </HomePageWrapper>
  );
}
