import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import MainPage from './components/MainPage'

import Layout from './components/Layout'
import ShoppingPage from './components/ShoppingPage'
import Cart from './components/Cart'

function App() {

    const [cart, setCart] = useState([]);   
    const [currentProduct, setCurrentProduct] = useState(null);
    const [cartCount, setCartCount] = useState(null)


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout cart ={cart} setCart ={setCart} cartCount={cartCount}/>,
            children: [
                { path: "/", element: <MainPage 
                    setCurrentProduct={setCurrentProduct}
                />},
                { path: "shop", element: <ShoppingPage  
                    cart={cart} 
                    setCart={setCart} 
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                    cartCount={cartCount}
                    setCartCount={setCartCount}
                />},
                { path: "cart", element: <Cart  
                    cart={cart} 
                    setCart={setCart} 
                    setCartCount={setCartCount}
                />}
            ]
        }
    ])
 

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
