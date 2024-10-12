import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/ItemsSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortAndFilter from '../components/SortAndFilter';

const Home = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.items);
    const [sortOrder, setSortOrder] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const items = Array.isArray(data) ? data : [];
    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    let filteredItems = items;
    // Apply category filter
    if (categoryFilter) {
        filteredItems = filteredItems.filter(item => item.category === categoryFilter);
    }

    // Apply sorting
    let sortedItems = [...filteredItems];
    if (sortOrder) {
        if (sortOrder === 'priceAsc') {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'priceDesc') {
            sortedItems.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'rating') {
            sortedItems.sort((a, b) => b.rating.rate - a.rating.rate);
        }
    }

    return (
        <>
         <Navbar/>
         <SortAndFilter 
                onSortChange={setSortOrder} 
                onFilterChange={setCategoryFilter} 
            />
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4"> {/* Set grid to 3 columns */}
            {loading && <p className='text-[4rem] text-gray-500 font-semibold flex justify-center items-center h-screen m-auto'>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && items.length === 0 && <p className='text-[4rem] text-gray-500 font-semibold flex justify-center items-center h-screen m-auto'>No items found</p>}
            
            {!loading && sortedItems.length > 0 && sortedItems.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>

                <div key={item.id} className=" hover:bg-slate-50 rounded-lg p-4 hover:shadow-md">
                    <img className="w-full h-[12rem] object-cover rounded" src={item.image} alt={item.title} />
                    <p className="mt-2 font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="font-bold text-lg">Price: ₹ {item.price}</p>
                       <span className='font-bold'>Rating: </span> <p className="px-1 py-1 bg-green-700 text-white border-gray-50 border  rounded">{item.rating.rate}★</p>
                    </div>
                </div>
              </Link>
            ))}
        </div>
        </>
        
    );
}

export default Home;
