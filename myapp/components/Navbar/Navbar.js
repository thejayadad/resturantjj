'use client'

import Link from 'next/link'
import React from 'react'
import { useSelector } from "react-redux";


const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);

  return (
    <header className='px-4 py-12'>
        <div className='flex justify-between max-w-screen-xl mx-auto'>
            <Link href={'/'}>T's Resturant</Link>
            <div>
                <Link href={'/cart'}>Cart
                <span>{quantity}</span>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar