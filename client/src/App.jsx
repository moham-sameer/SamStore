import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ProductDetails from './pages/productDetails'
const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App