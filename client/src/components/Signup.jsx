import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth);

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', password: '' });
    setTimeout(() => {
      dispatch(signup({ name, email, password }));
      navigate('/login');
    }, 700)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Join Us</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg py-3 font-bold text-lg transition duration-300 ease-in-out hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-1"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign Up'
            )}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center font-semibold">
              {error.msg ? error.msg : 'An error occurred'}
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already a user?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold transition duration-200">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;