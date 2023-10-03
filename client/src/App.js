import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import PhotoPurchase from './components/PhotoPurchase'; // Import the PhotoPurchase component
import Transactions from './components/Transactions'; // Import the Transactions component
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add routes for PhotoPurchase and Transactions */}
          <Route path="/photopurchase" element={<PhotoPurchase />} />
          <Route path="/transaction" element={<Transactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
