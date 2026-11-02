import React from 'react'
import { Link, Outlet } from 'react-router'
import logo from './assets/Logo(1).png'
import { Heart } from "@phosphor-icons/react";
import { ShoppingCart } from "@phosphor-icons/react";

const Layout = () => {
  return (
    <div>
      <nav className='flex justify-evenly items-center p-[40px] text-[20px]'>
        <img src={logo} alt="" />
        <Link to='/'>Home</Link>
        <Link>Shop</Link>
        <Link>Plant Care</Link>
        <Link>Blogs</Link>
        <Link to='login'>Login</Link>
        <div className='flex items-center gap-[25px]'>
          <Link to='favorites'>
          <Heart size={28} weight="regular" className='cursor-pointer' />
          </Link>
          <Link to='cart'>
            <ShoppingCart size={28} weight="regular" />
          </Link>
        </div>
      </nav>
      <Outlet/>
    </div>
  )
}

export default Layout
