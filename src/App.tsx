import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './pages/layout';
import Fallback from './pages/fallback';
import Product from './pages/product';
import { Dashboard } from './pages/dashboard';
import addProduct from './pages/addProduct';
import Login from './pages/login';
import Registration from './pages/registration';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/',
          Component: Dashboard,
          HydrateFallback: Fallback,
        },
        {
          path: '/product',
          Component: Product,
          HydrateFallback: Fallback,
        },
        {
          path: '/add-product',
          Component: addProduct,
          HydrateFallback: Fallback,
        },
        {
          path: '/login',
          Component: Login,
          HydrateFallback: Fallback,
        },
        {
          path: '/register',
          Component: Registration,
          HydrateFallback: Fallback,
        },
        {
          path: '/add-product',
          Component: addProduct,
          HydrateFallback: Fallback,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
