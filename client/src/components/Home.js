import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(6); // Set the number of photos per page

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL of your API endpoint for photos
    fetch("http://127.0.0.1:5555/api/photos")
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
    <div className="container">
      <h1 className="my-4">Welcome to SnapStore</h1>
      <div className="row">
<<<<<<< HEAD
        <div className="col-md-9"> {/* Content column */}
          <div className="row">
            {currentPhotos.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <div className="card card-sm"> {/* Add card-sm class to make cards smaller */}
                  <img src={photo.image} alt={photo.name} className="card-img-top" />
=======
        <div className="col-md-9">
          {" "}
          {/* Content column */}
          <div className="row">
            {currentPhotos.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <div className="card card-sm">
                  {" "}
                  {/* Add card-sm class to make cards smaller */}
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="card-img-top"
                  />
>>>>>>> origin/ft-development
                  <div className="card-body">
                    <h5 className="card-title">{photo.name}</h5>
                    <p className="card-text">{photo.description}</p>
                    <p className="card-text">Price: ${photo.price}</p>
<<<<<<< HEAD
                    <button className={`btn custom-love-button ${likes[photo.id] ? 'text-danger' : ''}`} onClick={() => toggleLike(photo.id)}>
                      {likes[photo.id] ? '❤️ Love' : '❤️ Like'}
                    </button>
                    <button className="btn btn-warning ml-2" onClick={() => addToCart(photo)}>
=======
                    <button
                      className={`btn custom-love-button ${
                        likes[photo.id] ? "text-danger" : ""
                      }`}
                      onClick={() => toggleLike(photo.id)}
                    >
                      {likes[photo.id] ? "❤️ Love" : "❤️ Like"}
                    </button>
                    <button
                      className="btn btn-warning ml-2"
                      onClick={() => addToCart(photo)}
                    >
>>>>>>> origin/ft-development
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav className="mt-4" aria-label="Page navigation">
            <ul className="pagination justify-content-center">
<<<<<<< HEAD
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
=======
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
>>>>>>> origin/ft-development
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
<<<<<<< HEAD
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
=======
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
>>>>>>> origin/ft-development
                    {index + 1}
                  </button>
                </li>
              ))}
<<<<<<< HEAD
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
=======
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
>>>>>>> origin/ft-development
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
<<<<<<< HEAD
        <div className="col-md-3"> {/* Cart column */}
=======
        <div className="col-md-3">
          {" "}
          {/* Cart column */}
>>>>>>> origin/ft-development
          <Cart cartItems={cart} />
        </div>
      </div>
    </div>
  );
}
export default Home; 
