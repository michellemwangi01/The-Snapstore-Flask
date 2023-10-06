import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component
import "../styles/mystyles.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(6); // Set the number of photos per page

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL of your API endpoint for photos
    fetch("http://127.0.0.1:5555/snapstore/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  console.log("our photos", photos);

  if (loading) {
    return <p>Loading...</p>;
  }

  const toggleLike = (photoId) => {
    const updatedLikes = { ...likes };
    updatedLikes[photoId] = !updatedLikes[photoId];
    setLikes(updatedLikes);
  };

  const addToCart = (photo) => {
    setCart([...cart, photo]);
  };

  // Calculate the indexes for the photos to display on the current page
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Function to handle page navigation
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(photos.length / photosPerPage);

  return (
    <div className="container_gallery">
      <h1 className="my-4">The SnapStore Gallery</h1>
      <div className="gallery_cart">
        <div className="galleryHolder">
          {currentPhotos.map((photo) => (
            <div key={photo.id} className="gallery_card_inner">
              {" "}
              {/* Add card-sm class to make cards smaller */}
              <img
                src={photo.image}
                alt={photo.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{photo.name}</h5>
                <p className="card-text">{photo.description}</p>
                <p className="card-text">Price: ${photo.price}</p>

                <button
                  className={`btn custom-love-button ${
                    likes[photo.id] ? "text-danger" : ""
                  }`}
                  onClick={() => toggleLike(photo.id)}
                >
                  {likes[photo.id] ? "❤️ Liked" : "❤️ Like"}
                </button>
                <button
                  className="addToCart btn btn-warning ml-2"
                  onClick={() => addToCart(photo)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="theCart">
          <Cart cartItems={cart} />
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
              <button className="page-link" onClick={() => paginate(index + 1)}>
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
    </div>
  );
};

export default Gallery;
