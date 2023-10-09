import React, { useState, useEffect } from 'react';

  const Cart = ({ user_ID, cartItem, cartRefresh, onCartRefresh, removeFromCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [carts, setCarts] = useState(cartItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false)


    // Function to handle the checkout process
    const handleCheckout = (photoId, user_ID) => {
    
      // Make a POST request to the /checkout endpoint
      fetch(`https://the-snapstore-flask-api.onrender.com/snapstore/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers (e.g., authentication)
        },
        body: JSON.stringify({
          photo_id: photoId,
          user_id: user_ID,
          
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
          }
  
          // Handle a successful checkout here
          const successMessage = 'Transaction initiated successfully!'; // Create a success message
          alert(successMessage); // Display the success message to the user
  
          // setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== cartItemId));
          removeFromCart(photoId);
          
          onCartRefresh();
        })
        .catch((error) => {
          console.error('Error during checkout:', error.message);
          alert('Error during checkout: ' + error.message);
        });
    };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetch(`https://the-snapstore-flask-api.onrender.com/snapstore/cart/items/${user_ID}`)
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }

        return response.json();
      })
      .then((data) => {
        // Set the retrieved cart items in the state
        setCartItems(data.cart_items);
        setLoading(false); // Update loading state
        // Calculate the total price when cart items change
        const totalPrice = data.cart_items.reduce((total, item) => total + item.photo.price, 0);
        setTotalPrice(totalPrice);
      })
      .catch((error) => {
        console.error('Error retrieving cart items:', error.message);
        alert('Error retrieving cart items: ' + error.message);
      });
  }, [cartItem]); // Run this effect when the user_ID changes




  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Your Cart</h5>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <div className="card-body">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
              
                <li key={item.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span>{item.name}</span>
                      <span className="ml-2">P.Name: {item.photo.name}</span>
                    </div>
                    <div>
                      <span className="ml-2">Price: ${item.photo.price}</span>
                      <button className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleCheckout(item.photo.id, user_ID)}
                      >Checkout</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="card-footer">
              <div className="d-flex justify-content-end">
                <strong>Total:</strong>
                <span className="ml-2">${totalPrice}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
