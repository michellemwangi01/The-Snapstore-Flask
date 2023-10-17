import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component
import "../styles/mystyles.css";
import Categories from "./Categories";
import PhotoCard from "./PhotoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery = ({ category_id, userID, jwToken }) => {
  console.log("our token is", jwToken);
  console.log("our user is", userID);

  const [photos, setPhotos] = useState([]);
  const [originalPhotos, setOriginalPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartRefresh, setCartRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10); // Set the number of photos per page
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;

  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const item_added_to_cart = () => toast("Added to cart!");

  const handleCartRefresh = () => {
    setCartRefresh(!cartRefresh);
  };
  console.log("cart items", cart);

  const removeFromCart = (photoId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== photoId));
  };

  useEffect(() => {
    fetch("https://the-snapstore-flask-api.onrender.com/snapstore/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setOriginalPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = (photo, userID) => {
    console.log("USER TO POST CART", userID);
    // Create an object with the data to send in the request body
    const data = {
      user_id: userID,
      photo_id: photo.id,
      quantity: 1,
    };

    // Make the POST request to add the photo to the cart
    fetch(
      `https://the-snapstore-flask-api.onrender.com/snapstore/cart/add/${photo.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add item to cart");
        }
      })
      .then((cartData) => {
        item_added_to_cart();
        console.log("Item added to cart:", cartData);
        setCart((prevCart) => [...prevCart, photo]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or processing
        console.error("Error adding item to cart:", error);
      });
  };

  console.log("items in cart", cart);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "2rem",
          padding: "2rem",
        }}
      >
        Loading data...
      </p>
    );
  }

  // Function to handle page navigation
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const photosList = currentPhotos.map((photo) => (
    <PhotoCard photo={photo} addToCart={addToCart} userID={userID} />
  ));

  //  const photosList = currentPhotos.map((photo) => (
  //    <PhotoCard key={photo.id} photo={photo} addToCart={addToCart} />
  //  ));

  return (
    <>
      <div className="container_gallery" style={{ position: "relative" }}>
        <h1 className="my-4">The SnapStore Gallery</h1>
        <Categories
          setPhotos={setPhotos}
          photos={photos}
          originalPhotos={originalPhotos}
        />
        <div className="gallery_cart">
          <div className="galleryHolder">
            {photosList.length > 0 ? (
              photosList
            ) : (
              <h1
                style={{
                  fontFamily: "cursive",
                  fontWeight: "lighter",
                  textAlign: "center",
                }}
              >
                {" "}
                Sorry, no photos were found for this category.
              </h1>
            )}
          </div>
        </div>

        <nav className="mt-4" aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div
          className="theCart"
          style={{
            position: "absolute",
            maxHeight: "60rem",
            overflow: "scroll",
            width: "30rem",
            padding: "0.5rem",
            top: "6.5%",
            backgroundColor: "whitesmoke",
            opacity: "0.99",
          }}
        >
          <Cart
            cartItem={cart}
            user_ID={userID}
            cartRefresh={cartRefresh}
            onCartRefresh={handleCartRefresh}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </>
  );
};

export default Gallery;
