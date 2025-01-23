import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './pages/layout';
import Fallback from './pages/fallback';
import Product from './pages/product';
import { Dashboard } from './pages/dashboard';
import addProduct from './pages/addProduct';
import Login from './pages/login';
import Registration from './pages/registration';
import { Order } from './pages/order';
import { DetailOrder } from './pages/detail-order';
import Settings from './pages/settings';

function App() {
  const router = createBrowserRouter([
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
      path: '/dashboard',
      Component: Dashboard,
      HydrateFallback: Fallback,
    },
    {
      path: '/',
      Component: Layout,
      HydrateFallback: Fallback,
      children: [
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
          path: '/order',
          Component: Order,
          HydrateFallback: Fallback,
        },
        {
          path: '/detail-order',
          Component: DetailOrder,
          HydrateFallback: Fallback,
        },
        {
          path: '/pengaturan',
          Component: Settings,
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
