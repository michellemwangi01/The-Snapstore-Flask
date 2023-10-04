import React, { useEffect, useState } from 'react';
import PhotoCard from './PhotoCard'; // Import the PhotoCard component

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from the API when the component mounts
    fetch('http://127.0.0.1:5555/api/photos') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data); // Set the fetched photos in state
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Photo List</h1>
      <div className="photo-container">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
