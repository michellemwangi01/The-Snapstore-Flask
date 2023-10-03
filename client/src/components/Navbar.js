// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIconImage from '../assets/profile-icon.svg';
import PhotosIconImage from '../assets/photos-svgrepo-com.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={PhotosIconImage} alt="Photos Icon" style={{ width: '32px', height: '32px', marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '36px', margin: '0' }}>
              <span style={{ color: 'green' }}>Snap</span>
              <span style={{ color: 'yellow' }}>Store</span>
            </span>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/photopurchase" className="nav-link">Photo Purchase</Link>
            </li>
            <li className="nav-item">
              <Link to="/transaction" className="nav-link">Transactions</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div className="input-group">
            <input type="text" placeholder="Search..." className="form-control py-2 border-right-0 border" style={{ borderRadius: '20px 0 0 20px' }} />
            <span className="input-group-append">
              <button className="btn btn-light py-2 px-3 border-left-0 border" type="button" style={{ borderRadius: '0 20px 20px 0' }}>Search</button>
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/profile" className="nav-link" style={{ marginLeft: '20px' }}>
            <img src={ProfileIconImage} alt="Profile Icon" style={{ width: '32px', height: '32px' }} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
