import React from 'react';

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <div className="card-body">
        <h5 className="card-title">{photo.title}</h5>
        {/* Add any additional information or actions here */}
      </div>
    </div>
  );
};

export default PhotoCard;
