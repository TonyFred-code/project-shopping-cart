import CartsPage from '@/pages/CartsPage.jsx';
import ErrorPage from '@/pages/ErrorPage.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ProductsPage from '@/pages/ProductsPage.jsx';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/shop',
    element: <ProductsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cart',
    element: <CartsPage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
