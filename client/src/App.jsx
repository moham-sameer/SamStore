import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ProductDetails from './pages/productDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App