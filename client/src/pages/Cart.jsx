import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { addToCart,decToCart, removeFromCart } from '../redux/CartSlice';
import Navbar from '../components/Navbar';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalQuantity } = useSelector((state) => state.cart);

    const handleIncreaseQuantity = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecreaseQuantity = (item) => {
      if(item.quantity > 1){
        dispatch(decToCart(item));
      }else{
        dispatch(removeFromCart(item.id));
      }
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
                <Link to="/" className="text-cyan-500 hover:text-cyan-400 text-lg mt-4 inline-block">Go Back to Shop</Link>
            </div>
        );
    }
    const handleClick = ()=>{
      alert("We will add this feature later.")
    }
    return (
      <>
        <Navbar/>
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-3xl font-bold">Your Cart</h1>

                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-24 h-24 object-contain" 
                            />
                            <div>
                                <h2 className="text-lg font-bold">{item.title}</h2>
                                <p className="text-gray-600">₹{item.price}</p>
                                <p className="text-sm text-gray-500">Category: {item.category}</p>
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleDecreaseQuantity(item)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => handleIncreaseQuantity(item)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                            >
                                +
                            </button>
                        </div>

                        {/* Remove Item Button */}
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 hover:text-red-700"
                        >
                            <FaTrash className="text-xl" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Right: Price Details */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold">Price Details</h2>
                <div className="flex justify-between">
                    <span className="text-lg">Total Items</span>
                    <span className="text-lg">{totalQuantity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-lg">Total Amount</span>
                    <span className="text-lg">₹{totalAmount.toFixed(2)}</span>
                </div>
                <button onClick={handleClick} className="w-full bg-green-500 text-white py-3 text-lg rounded-lg shadow-md hover:bg-green-400">
                    Proceed to Checkout
                </button>
            </div>
        </div>
      </>
    );
};

export default Cart;
