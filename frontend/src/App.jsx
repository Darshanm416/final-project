import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';

const App = () => (
  <Router>
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold">SEARS eCommerce</h1>
      <div className="space-x-4">
        <Link to="/" className="text-blue-500">Home</Link>
        <Link to="/create" className="text-green-600">Create Product</Link>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateProduct />} />
    </Routes>
  </Router>
);

export default App;
