import { createBrowserRouter, RouterProvider } from 'react-router';
import Fallback from './pages/fallback';
import Product from './pages/product';
import Login from './pages/login';
import Registration from './pages/registration';
// import { Order } from './pages/orderDummy';
import { DetailOrder } from './components/Order/detail-order';
import Settings from './pages/settings';
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import DetailProduct from './components/Product/detail-product';
import PrivateLayout from './layouts/PrivateLayout';
import { LandingPage } from './pages/landing-page';
import CheckoutProduct from './pages/checkout-product';
import AddProduct from './components/Product/add-product';
import StoreProduct from './pages/store-product';
import { OrderDummy } from './pages/orderDummy';
import { Order } from './pages/order';
import previewStoreProduct from './pages/preview-store-product';
// import UpdatedProduct from './components/Product/updated-product';
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
      path: '/store/:username',
      Component: StoreProduct,
      HydrateFallback: Fallback,
    },
    {
      path: '/:username/:url',
      Component: DetailProduct,
      HydrateFallback: Fallback,
    },
    {
      path: '/checkout-product',
      Component: CheckoutProduct,
      HydrateFallback: Fallback,
    },
    {
      path: '/Fallback',
      Component: Fallback,
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
          Component: AddProduct,
          HydrateFallback: Fallback,
        },
        // {
        //   path: '/updated-product',
        //   Component: UpdatedProduct,
        //   HydrateFallback: Fallback,
        // },
        {
          path: '/order',
          Component: Order,
          HydrateFallback: Fallback,
        },
        {
          path: '/preview/store/:username',
          Component: previewStoreProduct,
          HydrateFallback: Fallback,
        },
        {
          path: '/order-dummy',
          Component: OrderDummy,
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
