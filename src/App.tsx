import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Pages/Root';
import HomePage from './Pages/HomePage/HomePage';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/CartPage/Cart';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;