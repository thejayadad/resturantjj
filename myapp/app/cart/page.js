'use client'
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  // Calculate subtotal
  const calculateTotal = () => {
    return cart.products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    const lineItems = cart.products.map((book) => {
        return {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title,
          },
          unit_amount: book.price * 100, // Corrected this line
        },
        quantity: book.quantity,
      };
    });
  
    try {
      const response = await axios.post("http://localhost:3000/api/checkout", {
        lineItems,
      });
  
      const data = response.data;
  
      const stripe = await stripePromise;
  
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  

  return (
    <div className="max-w-screen-xl mx-auto flex mt-10">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product) => (
            <tr key={product._id}>
              <td>
                <span className="font-medium text-red-600 text-lg">
                  {product.title}
                </span>
              </td>
              <td>
                <span className="text-gray-600">
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text}, </span>
                  ))}
                </span>
              </td>
              <td>
                <span className="font-medium text-lg">${product.price}</span>
              </td>
              <td>
                <span className="font-medium text-lg">{product.quantity}</span>
              </td>
              <td>
                <span className="font-medium text-lg">
                  ${product.price * product.quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <div className="max-h-96 bg-gray-800 p-4 flex flex-col justify-between text-white">
          <h2 className="text-2xl font-bold">CART TOTAL</h2>
          <div>
            <div className="flex justify-between text-lg">
              <b className="text-gray-400">Subtotal:</b>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <b className="text-gray-400">Discount:</b>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-lg">
              <b className="text-gray-400">Total:</b>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          {open ? (
            <div className="flex flex-col mt-4 space-y-2">
              <button
                className="py-2 bg-white text-teal-500 font-bold cursor-pointer"
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              {/* PayPalScriptProvider and ButtonWrapper (if needed) */}
            </div>
          ) : (
            <button
              className="py-2 bg-red-600 text-white font-bold cursor-pointer"
              onClick={handleCheckout}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
