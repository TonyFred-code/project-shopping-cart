import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import SideMenu from '../../src/components/SideMenu.jsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockToggleOpen = vi.fn();

const renderSideMenu = (props = {}) => {
  return render(
    <MemoryRouter initialEntries={['/dummy']}>
      <Routes>
        <Route
          path="/dummy"
          element={
            <SideMenu open={true} toggleOpen={mockToggleOpen} {...props} />
          }
        />
        <Route path="/" element={<div>Wishlist</div>} />
        <Route path="/shop" element={<div>Shop Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('SideMenu', () => {
  it('should render to match snapshot', () => {
    const { container } = renderSideMenu();

    expect(container).toMatchSnapshot();
  });

  it('should call toggleOpen when backdrop is clicked', async () => {
    const user = userEvent.setup();
    renderSideMenu();

    const backDrop = screen.getByTestId('backdrop');

    await user.click(backDrop);
    expect(mockToggleOpen).toHaveBeenCalled();
  });

  it.each([
    {
      selectorRegExp: /all products/i,
      scenario: 'navigate to shop page when clicked',
      expectedMatcher: /shop page/i,
    },
    {
      selectorRegExp: /wishlist/i,
      scenario: 'navigate to home page when clicked',
      expectedMatcher: /wishlist/i,
    },
  ])(
    'should $scenario and call toggleOpen',
    async ({ selectorRegExp, expectedMatcher }) => {
      const user = userEvent.setup();
      renderSideMenu();

      const link = screen.queryByText(selectorRegExp);
      await user.click(link);

      expect(screen.getByText(expectedMatcher)).toBeInTheDocument();
      expect(mockToggleOpen).toHaveBeenCalledOnce();
    }
  );

  it.each([
    {
      hashLocation: '#on-sale',
      selectorRegExp: /sale/i,
    },
    {
      hashLocation: '#in-season',
      selectorRegExp: /season/i,
    },
  ])(
    'should navigate to hash location and call toggleOpen',
    async ({ selectorRegExp }) => {
      const user = userEvent.setup();
      renderSideMenu();

      const link = screen.getByText(selectorRegExp);
      await user.click(link);

      expect(mockToggleOpen).toHaveBeenCalledOnce();
      // expect(window.location.hash).toBe(hashLocation);
      //TODO: ADD TEST CASE FOR HAS NAVIGATION
    }
  );
});
