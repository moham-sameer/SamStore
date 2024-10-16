import React from 'react'
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
import { useDispatch } from 'react-redux'
import { setUserFromToken } from './redux/AuthSlice'
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setUserFromToken(token)); // Dispatch the action to set user
    }
  }, [dispatch]);
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