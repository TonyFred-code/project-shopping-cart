import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import Profile from '@/pages/Profile';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile/:name?',
    element: <Profile />,
  },
];

export default routes;
