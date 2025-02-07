import React,{useEffect} from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ProductDetails from './pages/productDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import SearchResults from './pages/SearchResults'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn'
import { useDispatch, useSelector } from 'react-redux'
import { setUserFromToken } from './redux/middleware/jwt'
const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state)=>state.auth)
    console.log('authState: ', authState)
    console.log('user: ', authState.user)
    console.log('error: ', authState.error)
    console.log('loading: ', authState.loading)
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Token found in localStorage: ", token); // Debugging line
      dispatch(setUserFromToken(token)); // Dispatch the action to set user from token
    } else {
      console.log("No token found in localStorage"); // Debugging line
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("User from App.jsx:", authState.user); // Log user after login
    if (authState.user) {
      console.log("Yeheee yahooo yipeee!")
    }
  }, [authState.user]);
  
  return (
    <div> 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<RedirectIfLoggedIn><Login/></RedirectIfLoggedIn>} />
        <Route path="/signup" element={<RedirectIfLoggedIn><Signup/></RedirectIfLoggedIn>} />
        <Route path = "/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App