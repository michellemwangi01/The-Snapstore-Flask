import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIconImage from '../assets/profile-icon.svg';
import PhotosIconImage from '../assets/photos-svgrepo-com.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-orangered">
      <div className="container">
        <Link to="/" className="navbar-brand"> {/* Wrap the logo in Link */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={PhotosIconImage} alt="Photos Icon" style={{ width: '32px', height: '32px', marginRight: '5px' }} />
            <span style={{ fontWeight: 'bold', fontSize: '24px', margin: '0' }}>
              <span style={{ color: 'green' }}>Snap</span>
              <span style={{ color: 'yellow' }}>Store</span>
            </span>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div className="input-group">
            <input type="text" placeholder="Search..." className="form-control py-2 border-right-0 border" style={{ borderRadius: '20px 0 0 20px' }} />
            <span className="input-group-append">
              <button className="btn btn-light py-2 px-3 border-left-0 border" type="button" style={{ borderRadius: '0 20px 20px 0' }}>Search</button>
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/profile" className="nav-link" style={{ marginLeft: '10px' }}>
            <img src={ProfileIconImage} alt="Profile Icon" style={{ width: '32px', height: '32px' }} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
