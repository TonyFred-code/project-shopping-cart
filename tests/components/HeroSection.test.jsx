import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import HeroSection from '../../src/components/HeroSection.jsx';

describe('HeroSection', () => {
  it('should render to match snapshot', () => {
    const { container } = render(<HeroSection />);

    expect(container).toMatchSnapshot();
  });

  it('should display hero heading and about us section', () => {
    render(<HeroSection />);

    expect(
      screen.getByText(/fresh from our farm to your table/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(
      screen.getByText(/we are passionate about bringing fresh/i)
    ).toBeInTheDocument();
  });
});
