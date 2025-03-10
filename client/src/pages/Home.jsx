import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/ItemsSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortAndFilter from '../components/SortAndFilter';
import Pagination from '../components/Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.items);
    const [sortOrder, setSortOrder] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(6);
    
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
    // pagination feature
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedItems.slice(indexOfFirstPost, indexOfLastPost);
    if (sortOrder) {
        if (sortOrder === 'priceAsc') {
            currentPosts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'priceDesc') {
            currentPosts.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'rating') {
            currentPosts.sort((a, b) => b.rating.rate - a.rating.rate);
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
            
            {!loading && sortedItems.length > 0 && currentPosts.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id}>

                <div key={item._id} className=" hover:bg-slate-50 rounded-lg p-4 hover:shadow-md">
                    <img className="w-full h-[12rem] object-cover rounded" src={item.imageUrl} alt={item.title} />
                    <p className="mt-2 font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="font-bold text-lg">Price: ₹ {item.price}</p>
                       <span className='font-bold'>Rating: </span> <p className="px-1 py-1 bg-green-700 text-white border-gray-50 border  rounded">{item.rating}★</p>
                    </div>
                </div>
              </Link>
            ))}
        </div>
                    <Pagination className="self-center"
                     totalPosts={sortedItems.length}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                      postsPerPage={postsPerPage}/>
        </>
        
    );
}

export default Home;
