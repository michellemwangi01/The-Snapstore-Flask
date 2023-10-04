import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className="bg-light p-3">
      <h3 className="text-dark">Categories</h3>
      <ul className="list-unstyled">
        <li className="mb-2">
          <Link to="/" className="btn btn-primary btn-lg btn-block">Home</Link> {/* Blue */}
        </li>
        <li className="mb-2">
          <Link to="/photopurchase" className="btn btn-warning btn-lg btn-block">Photo Purchase</Link> {/* Yellow */}
        </li>
        <li>
          <Link to="/transaction" className="btn btn-success btn-lg btn-block">Transactions</Link> {/* Green */}
        </li>
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
}

export default Categories;
