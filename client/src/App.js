// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Home from './components/Home';
import PhotoPurchase from './components/PhotoPurchase';
import Transactions from './components/Transactions';
import Profile from './components/Profile'; // Import the Profile component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        <div className="container-fluid">
          <div className="row">
            {/* Categories Container */}
            <div className="col-md-2 bg-light">
              <Categories />
            </div>

            {/* Main Content */}
            <div className="col-md-10">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/photopurchase" element={<PhotoPurchase />} />
                  <Route path="/transaction" element={<Transactions />} />
                  <Route path="/profile" element={<Profile />} /> {/* Profile route */}
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
