import React, { useState, useEffect } from 'react';

function Home() {
  const [imageData, setImageData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [likesCount, setLikesCount] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    // Replace with your actual API endpoint to fetch image data
    fetch('https://your-api-endpoint.com/image')
      .then((response) => response.json())
      .then((data) => {
        setImageData(data); // Assuming the API returns an object with image data
      })
      .catch((error) => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const addToCart = () => {
    if (imageData) {
      // Create a new item with selected quantity and image data
      const cartItem = {
        imageData,
        quantity: selectedQuantity,
      };

      // Add the cartItem to the cart
      setCart([...cart, cartItem]);
    }
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h1>Welcome to SnapStore</h1>
      {imageData && <img src={imageData.imageUrl} alt={imageData.imageAlt} />}
      <button onClick={toggleLike}>
        {liked ? 'Unlike' : 'Like'} ({likesCount})
      </button>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <button onClick={addToCart}>Add to Cart</button>
      <p>Items in Cart: {cart.length}</p>
    </div>
  );
}

export default Home;
