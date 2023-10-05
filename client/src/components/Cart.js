import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Your Cart</h5>
      </div>
      <ul className="list-group list-group-flush">
        {cartItems.length === 0 ? (
          <li className="list-group-item">Your cart is empty</li>
        ) : (
          cartItems.map((item) => (
            <li key={item.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="card-footer">
        {cartItems.length > 0 && (
          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <span>
              ${cartItems.reduce((total, item) => total + item.price, 0)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
