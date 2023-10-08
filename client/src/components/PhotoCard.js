import React, { useState } from "react";

const PhotoCard = ({ photo, addToCart }) => {
  const [likes, setLikes] = useState({});
  const toggleLike = (photoId) => {
    const updatedLikes = { ...likes };
    updatedLikes[photoId] = !updatedLikes[photoId];
    setLikes(updatedLikes);
  };

  return (
    <div key={photo.id} className="gallery_card_inner">
      {" "}
      {/* Add card-sm class to make cards smaller */}
      <img src={photo.image} alt={photo.name} className="card-img-top" />
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
  );
};

export default PhotoCard;
