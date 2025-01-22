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
          path: '/login',
          Component: Login,
          HydrateFallback: Fallback,
        },
        {
          path: '/register',
          Component: Registration,
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
