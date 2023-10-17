import React, { useState, useEffect } from "react";
import "../styles/mystyles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const PhotoCard = ({ photo, addToCart, userID }) => {
  const [likes, setLikes] = useState({});
  const toggleLike = (photoId) => {
    const updatedLikes = { ...likes };
    updatedLikes[photoId] = !updatedLikes[photoId];
    setLikes(updatedLikes);
  };

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <div
      key={photo.id}
      className="gallery_card_inner"
      data-aos="flip-right"
      data-aos-once="true"
    >
      {" "}
      {/* Add card-sm class to make cards smaller */}
      <img src={photo.image} alt={photo.name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{photo.name}</h5>
        <p className="card-text">{photo.description}</p>
        <p className="card-text">
          Price:
          {photo.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2, // Ensure 2 decimal places
          })}
        </p>
        <p className="card-text" style={{ fontStyle: "italic" }}>
          Posted by: {photo.user.username}
        </p>

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
          onClick={() => addToCart(photo, userID)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
