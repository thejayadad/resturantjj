'use client'
import Link from 'next/link';

import React from 'react'

const ProductCard = ({product: {_id, title, prices, desc}}) => {
  return (
    <div key={_id}>
    <Link
    href={`/product/${_id}`}
    >
      <div className="mt-4 text-center">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{title}</h3>
        <p>{prices[0]}</p>
        <span>{desc}</span>
      </div>
    </Link>
    </div>
  )
}

export default ProductCard