import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/AuthSlice'; // Assuming you have a logout action

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
                        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{user.name}</h2>
                        <p className="mt-2 text-gray-500">{user.email}</p>
                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-700">Account Details</h3>
                            <p className="mt-1 text-sm text-gray-600">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                            {/* Add more user details here as needed */}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;