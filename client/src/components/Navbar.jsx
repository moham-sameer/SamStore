import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);  // Get cart item count
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to search results page or filter items based on searchQuery
        console.log('Searching for:', searchQuery);
        // Optionally, you can redirect to a search results page or filter items on the Home page.
    };
    return (
        <nav className="bg-gray-800 p-4 fixed top-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Left: Logo or Brand Name */}
                <Link to="/" className="text-white text-2xl font-bold">
                    SamStore
                </Link>

                {/* Center: Links to different pages */}
                <div className="space-x-6">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..." 
                    className="p-2 rounded-l-lg focus:outline-none"
                />
                <button type="submit" className="p-2 bg-blue-600 rounded-r-lg">
                    Search
                </button>
            </form>
                    <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
                </div>

                {/* Right: Cart Icon */}
                <div className="relative">
                    <Link to="/cart">
                        <FaShoppingCart className="text-white text-2xl" />
                    </Link>
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-2">
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
