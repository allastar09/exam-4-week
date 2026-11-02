  import './App.css'
  import { createBrowserRouter } from "react-router";
  import { RouterProvider } from "react-router/dom";
  import Layout from './Layout';
import Home from './Home';
import Login from './Login';
import Favorite from './Favorite';
import Cart from './Cart';
import Product from './Products';

  function App() {

    const router =createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home /> 
        },
        {
          path: 'login',
          element: <Login />
        },{
          path: 'favorites',
          element: <Favorite />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'product/:id',
          element: <Product />
        }
      ]
    }
  ])

    return (<RouterProvider router={router} />)
  }

  export default App
