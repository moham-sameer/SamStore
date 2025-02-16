import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-6 mb-4">
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`mx-1 px-4 py-2 border rounded-md ${
                        currentPage === page
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
