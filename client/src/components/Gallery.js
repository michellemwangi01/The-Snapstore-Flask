import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component
import "../styles/mystyles.css";
import Categories from "./Categories";
import PhotoCard from "./PhotoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery = ({ category_id }) => {
  const [photos, setPhotos] = useState([]);
  const [originalPhotos, setOriginalPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(4); // Set the number of photos per page
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;

  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const item_added_to_cart = () => toast("Added to cart!");

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

  const addToCart = (photo) => {
    setCart([...cart, photo]);
    item_added_to_cart();
  };

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
    <PhotoCard photo={photo} addToCart={addToCart} />
  ));

  //  const photosList = currentPhotos.map((photo) => (
  //    <PhotoCard key={photo.id} photo={photo} addToCart={addToCart} />
  //  ));

  return (
    <>
      <div className="container_gallery">
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
        <div className="theCart">
          <Cart cartItems={cart} />
        </div>
      </div>
    </>
  );
};

export default Gallery;
