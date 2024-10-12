// src/components/SortAndFilter.jsx
import React from 'react';

const SortAndFilter = ({ onSortChange, onFilterChange }) => {
    return (
        <div className="flex justify-between p-1 bg-gray-100 rounded-lg shadow-md mt-16">
            <select onChange={(e) => onSortChange(e.target.value)} className="border rounded-md p-2">
                <option value="">Sort by</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Rating</option>
            </select>
            <select onChange={(e) => onFilterChange(e.target.value)} className="border rounded-md p-2">
                <option value="">Filter by Category</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
        </div>
    );
};

export default SortAndFilter;
