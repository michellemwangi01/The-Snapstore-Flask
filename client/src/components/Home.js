import React, { useState, useEffect } from 'react';
import Cart from './Cart'; // Import the Cart component

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(6); // Set the number of photos per page

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL of your API endpoint for photos
    fetch('http://127.0.0.1:5555//photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
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
        <div className="col-md-9"> {/* Content column */}
          <div className="row">
            {currentPhotos.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <div className="card card-sm"> {/* Add card-sm class to make cards smaller */}
                  <img src="data:image/jpeg;base64,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" alt={photo.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{photo.name}</h5>
                    <p className="card-text">{photo.description}</p>
                    <p className="card-text">Price: ${photo.price}</p>
                    <button className={`btn custom-love-button ${likes[photo.id] ? 'text-danger' : ''}`} onClick={() => toggleLike(photo.id)}>
                      {likes[photo.id] ? '❤️ Love' : '❤️ Like'}
                    </button>
                    <button className="btn btn-warning ml-2" onClick={() => addToCart(photo)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav className="mt-4" aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
        <div className="col-md-3"> {/* Cart column */}
          <Cart cartItems={cart} />
        </div>
      </div>
    </div>
  );
}

export default Home;
