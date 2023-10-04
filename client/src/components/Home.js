import React, { useState, useEffect } from 'react';

function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({}); // Store liked photos
  const [cart, setCart] = useState([]); // Store items in the cart

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL of your API endpoint for photos
    fetch('http://127.0.0.1:5555/api/photos')
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

  // Function to handle liking or unliking a photo
  const toggleLike = (photoId) => {
    const updatedLikes = { ...likes };
    updatedLikes[photoId] = !updatedLikes[photoId];
    setLikes(updatedLikes);
  };

  // Function to handle adding a photo to the cart
  const addToCart = (photo) => {
    setCart([...cart, photo]);
  };

  return (
    <div>
      <h1>Welcome to SnapStore</h1>
      <div className="photo-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.image} alt={photo.name} />
            <h2>{photo.name}</h2>
            <p>{photo.description}</p>
            <p>Price: ${photo.price}</p>
            <button onClick={() => toggleLike(photo.id)}>
              {likes[photo.id] ? 'Unlike' : 'Like'}
            </button>
            <button onClick={() => addToCart(photo)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Price: ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home; 