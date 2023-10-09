import React, { useState, useEffect } from "react";
import "../styles/formcss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = ({ username, jwToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    category: "",
    postedBy: username,
  });

  const [categories, setCategories] = useState([]);
  const new_product_added = () => toast("Product added successfully!");

  useEffect(() => {
    fetch("https://the-snapstore-flask-api.onrender.com/snapstore/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      price: formData.price,
      category: formData.category,
      postedBy: username,
    };

    console.log(newProduct);
    fetch("https://the-snapstore-flask-api.onrender.com/snapstore/addphotos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added successfully:", data);
        new_product_added();
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          price: "",
          category: "",
          postedBy: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="form-container">
      <h2>Add a New Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="input-field"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="input-field"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            className="input-field"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            className="input-field"
            name="price"
            min={0}
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            className="input-field"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="postedBy">Posted By:</label>
          <input
            type="text"
            id="postedBy"
            className="input-field"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
