import React, { useState } from "react";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the image to the server
    const formData = new FormData();
    formData.append("image", image);

    // Send the formData to your Flask backend using fetch or Axios
    fetch("http://127.0.0.1:5555/uploadimage", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Image upload response:", data);
      })
      .catch((error) => {
        console.error("Image upload error:", error);
      });
  };

  return (
    <div class="mb-3">
      <label for="formFile" class="form-label">
        Upload Image
      </label>
      <input class="form-control" type="file" id="formFile" accept="image/*" />
    </div>
  );
};

export default ImageUploadForm;
