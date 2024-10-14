import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const items = useSelector((state) => state.items.data);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value) {
            const filteredSuggestions = items.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.title);
        setSuggestions([]);
        navigate(`/product/${suggestion.id}`);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 fixed top-0 w-full shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Left: Logo or Brand Name */}
                <Link to="/" className="text-white text-3xl font-extrabold italic">
                    <span className="bg-white text-purple-600 px-2 py-1 rounded-lg mr-1">Sam</span>
                    <span className="text-yellow-300">Store</span>
                </Link>

                {/* Center: Search bar and links */}
                <div className="flex items-center space-x-6 flex-grow justify-center">
                    <div className="relative w-1/2 max-w-2xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search products..."
                            className="p-3 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full transition duration-200 bg-white bg-opacity-20 text-white placeholder-gray-200"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        {suggestions.length > 0 && (
                            <ul className="absolute bg-white text-purple-600 mt-1 rounded-lg shadow-lg z-10 w-full max-h-60 overflow-y-auto custom-scrollbar">
                                {suggestions.map((suggestion) => (
                                    <li 
                                        key={suggestion.id} 
                                        className="p-2 cursor-pointer hover:bg-purple-100"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to="/contact" className="text-white hover:text-yellow-300 transition duration-200">Contact Us</Link>
                </div>

                {/* Right: Cart Icon */}
                <div className="relative">
                    <Link to="/cart" className="flex items-center group">
                        <FaShoppingCart className="text-white text-2xl group-hover:text-yellow-300 transition duration-200" />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-yellow-300 text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalQuantity}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;