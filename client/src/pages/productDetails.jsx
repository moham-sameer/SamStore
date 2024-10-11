import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../redux/ItemsSlice';  // Create a new action for fetching single item

const productDetails = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.items);  // Assuming you store the selected product in the redux state

    useEffect(() => {
        dispatch(fetchItemById(id));  // Dispatch action to fetch product by ID
    }, [dispatch, id]);

    if (loading) return <p className='text-[4rem] text-gray-500 font-semibold flex justify-center items-center h-screen m-auto'>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p className='text-[4rem] text-gray-500 font-semibold flex justify-center items-center h-screen m-auto'>Product not found!</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <img className="w-full h-[30rem] object-cover rounded" src={product.image} alt={product.title} />
            <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
            <p className="text-lg mt-2">{product.description}</p>
            <p className="text-2xl font-bold mt-4">$ {product.price}</p>
            <button className="mt-4 px-4 py-2 bg-cyan-300 border-gray-50 border rounded">Add to Cart</button>
        </div>
    );
}

export default productDetails;

