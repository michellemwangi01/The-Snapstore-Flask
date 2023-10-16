import React, { useState, useEffect } from "react";
import Cart from "./Cart"; // Import the Cart component
import "../styles/mystyles.css";
import Categories from "./Categories";
import PhotoCard from "./PhotoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourGallery = ({ category_id, jwToken }) => {
  const [yourPhotos, setYourPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(8);
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;

  //   const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  useEffect(() => {
    fetch(
      `https://the-snapstore-flask-api.onrender.com/snapstore/userphotos/
`,
      {
        headers: {
          Authorization: `Bearer ${jwToken}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setYourPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

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

  if (yourPhotos.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "2rem",
          padding: "2rem",
        }}
      >
        You have not posted any images to the site.
      </p>
    );
  }

  // Function to handle page navigation
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  //   const totalPages = Math.ceil(photos.length / photosPerPage);

  const photosList = yourPhotos.map((photo) => <PhotoCard photo={photo} />);

  return (
    <>
      <div className="your_gallery_container">
        <h1 className="my-4">Your Catalog</h1>
        <div className="gallery_cart">{photosList}</div>
      </div>
    </>
  );
};

export default YourGallery;
