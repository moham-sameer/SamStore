// src/pages/SearchResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const query = new URLSearchParams(useLocation().search).get('query');
    
    // Here you can fetch or filter products based on the query.
    // For simplicity, we will display the query.
    return (
        <div>
            <h1>Search Results for: {query}</h1>
            {/* Render filtered products here */}
        </div>
    );
};

export default SearchResults;
