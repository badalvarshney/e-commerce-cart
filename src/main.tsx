import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './Store/CartContext.tsx'

createRoot(document.getElementById('root')!).render(

  <CartProvider>
    <App />

  </CartProvider>

)
