import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lottie from "lottie-web";
import animationData from "./CartAnimation.json";

const Cart = ({
  user_ID,
  cartItem,
  cartRefresh,
  onCartRefresh,
  removeFromCart,
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [carts, setCarts] = useState(cartItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const container = useRef(null);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    animation.addEventListener("DOMLoaded", () => {
      setAnimationLoaded(true);
    });

    return () => {
      animation.destroy();
    };
  }, []);

  const transaction_created_successfully = () =>
    toast("Item checked out. Transaction successfully updated!");

  // Function to handle the checkout process
  const handleCheckout = (photoId, user_ID) => {
    // Make a POST request to the /checkout endpoint
    console.log(photoId, user_ID);
    fetch(`https://the-snapstore-flask-api.onrender.com/snapstore/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photo_id: photoId,
        user_id: user_ID,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log("Error: HTTP error! Status: " + response.status);
        } else {
          transaction_created_successfully();
          removeFromCart(photoId);
          onCartRefresh();
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error.message);
        alert("Error during checkout: " + error.message);
      });
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetch(
      `https://the-snapstore-flask-api.onrender.com/snapstore/cart/items/${user_ID}`
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
          );
        }

        return response.json();
      })
      .then((data) => {
        // Set the retrieved cart items in the state
        setCartItems(data.cart_items);
        setLoading(false); // Update loading state
        // Calculate the total price when cart items change
        const totalPrice = data.cart_items.reduce(
          (total, item) => total + item.photo.price,
          0
        );
        setTotalPrice(totalPrice);
      })
      .catch((error) => {
        console.error("Error retrieving cart items:", error.message);
        alert("Error retrieving cart items: " + error.message);
      });
  }, [cartItem]); // Run this effect when the user_ID changes

  return (
    <div
      className="card"
      style={{ minHeight: "90%", backgroundColor: "transparent" }}
    >
      <div className="card-header bg-primary text-white">
        <h5
          className="mb-0"
          style={{ textAlign: "center", fontStyle: "italic" }}
        >
          Your Cart
        </h5>
      </div>
      <div className="container" ref={container}></div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cartItems.length === 0 ? (
            <div className="card-body" style={{ minHeight: "4rem" }}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item"
                  style={{ padding: "1rem", margin: "10px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      className="d-flex flex-row"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <span>
                        <img
                          src={item.photo.image}
                          style={{
                            height: "50px",
                            borderRadius: "25%",
                            marginRight: "1rem",
                            width: "50px",
                          }}
                        />
                      </span>
                      <span className="ml-2">{item.photo.name}</span>
                    </div>
                    <div>
                      <span className="ml-2">Price: ${item.photo.price}</span>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleCheckout(item.photo.id, user_ID)}
                        style={{
                          backgroundColor: "transparent",
                          opacity: "0.8",
                          color: "blue",
                          marginLeft: "15px",
                          border: "1px blue solid",
                        }}
                      >
                        Checkout
                      </button>
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
