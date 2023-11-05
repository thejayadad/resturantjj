'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from '@/redux/cartSlice';

const ProductDetail = (ctx) => {
    const [productDetails, setProductDetails] = useState({});
    const [price, setPrice] = useState("");
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();

    const changePrice = (number) => {
        setPrice(price + number);
      };
    

    useEffect(() => {
        async function fetchFood() {
          try {
            const response = await fetch(`http://localhost:3000/api/product/${ctx.params.id}`, { cache: 'no-store' });
    
            if (response.ok) {
              const food = await response.json();
              setProductDetails(food);
              setPrice(food.prices[0]);
              console.log('productDetails:', productDetails);
            console.log('productDetails.extraOptions:', productDetails.extraOptions);

            } else {
              console.error(`Error fetching food: ${response.status}`);
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
    
        fetchFood();
      }, []);
      
    const handleSize = (sizeIndex) => {
        const difference = productDetails.prices[sizeIndex] - productDetails.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;
    
        if (checked) {
          changePrice(option.price);
          setExtras((prev) => [...prev, option]);
        } else {
          changePrice(-option.price);
          setExtras(extras.filter((extra) => extra._id !== option._id));
        }
      };
    
      const handleClick = () => {
        dispatch(addProduct({...productDetails, extras, price, quantity}));
      };
    

    return (
        <section className="px-4 py-12">
        <div className="max-w-screen-xl mx-auto">
            <div key={productDetails?.id}>
                <h2 className="text-center">{productDetails?.title}</h2>
                <p>Price: {productDetails?.prices}</p>
                <p>{productDetails?.desc}</p>
                <h2 className='mt-6 '>CUSTOMIZE:</h2>
                <div className='flex gap-4'>
                    <button onClick={() => handleSize(0)}>3 Piece Fish</button>
                    <button onClick={() => handleSize(1)}>4 Piece Fish</button>
                    <button onClick={() => handleSize(2)}>5 Piece Fish</button>
                </div>
                <h2 className='mt-4'>EXTRA OPTIONS:</h2>
                {productDetails.extraOptions && productDetails.extraOptions?.map((option) => (
                    <div key={option._id}>
                        <label htmlFor={option.text}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                onChange={(e) => handleChange(e, option)}
                            />
                            {option.text}
                        </label>
                    </div>
                ))}
            </div>
            <div>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
          />
          <button className='px-2  py-1 bg-gray-300' onClick={handleClick}>
            Add to Cart
          </button>
        </div>
        </div>
    </section>
    );
}

export default ProductDetail;
