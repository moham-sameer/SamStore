import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItemById } from '../redux/ItemsSlice';
import { addToCart } from '../redux/CartSlice';  // Import addToCart action
import Navbar from '../components/Navbar';

const productDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.items);
     const [addedToCart,setAddedToCart] = useState(false);
     const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchItemById(id));
    }, [dispatch, id]);

        const handleAddToCart = () => {
            dispatch(addToCart(product));  // Add the product to the cart
            setAddedToCart(true);  // Change the button text
            setTimeout(() => {
                navigate('/cart');  // Navigate to the cart page after 1 second
            }, 1000);
        };   

    if (loading) return <p className="text-center text-4xl mt-10">Loading...</p>;
    if (error) return <p className="text-center text-2xl text-red-600">Error: {error}</p>;
    if (!product) return <p className="text-center text-2xl">Product not found!</p>;

    return (
        <>
            <Navbar/>
            <div className="max-w-7xl mx-auto p-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img 
                        className="w-full h-[20rem] object-contain sm:h-[25rem] lg:h-[30rem]" 
                        src={product.imageUrl} 
                        alt={product.title} 
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                        <p className="text-xl text-gray-700 mt-4">{product.description}</p>
                        <p className="text-lg text-gray-600 mt-2">Category: {product.category}</p>
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-green-700">Price: ₹{product.price}</p>
                        <p className="text-lg font-medium mt-2">Rating: {product.rating} ★</p>
                    </div>

                    <button 
                    onClick={handleAddToCart}
                    className={`w-full ${addedToCart ? 'bg-green-500' : 'bg-cyan-500'} text-white py-3 text-lg rounded-lg shadow-md hover:bg-cyan-400`}
                    disabled={addedToCart}  // Disable button after adding to cart
                >
                    {addedToCart ? 'Going to Cart...' : 'Add to Cart'}
                </button>
                </div>
            </div>
        </>
    );
};

export default productDetails;
