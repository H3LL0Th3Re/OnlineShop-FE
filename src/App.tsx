import { createBrowserRouter, RouterProvider } from 'react-router';
import Fallback from './pages/fallback';
import Product from './pages/product';
import addProduct from './components/Product/add-product';
import Login from './pages/login';
import Registration from './pages/registration';
import { Order } from './pages/order';
import { DetailOrder } from './components/Order/detail-order';
import Settings from './pages/settings';
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import DetailProduct from './components/Product/detail-product';
import PrivateLayout from './layouts/PrivateLayout';
import { LandingPage } from './pages/landing-page';

function App() {
  const router = createBrowserRouter([
    {
      path: '/landing-page',
      Component: LandingPage,
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
      path: '/home',
      Component: Home,
      HydrateFallback: Fallback,
    },
    {
      path: '/detail-product',
      Component: DetailProduct,
      HydrateFallback: Fallback,
    },
    {
      path: '/',
      Component: PrivateLayout,
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
          path: '/dashboard',
          Component: Dashboard,
          HydrateFallback: Fallback,
        },
        {
          path: '/detail-order/:orderId',
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
