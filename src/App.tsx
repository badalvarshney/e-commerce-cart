import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Pages/Root';
import HomePage from './Pages/HomePage/HomePage';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/CartPage/Cart';
import Wishlist from './Pages/Wishlist/Wishlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;