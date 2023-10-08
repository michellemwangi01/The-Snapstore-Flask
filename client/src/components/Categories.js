// export default FetchAPIData;
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = ({ photos, setPhotos, originalPhotos }) => {
  const [categories, setCategories] = useState([]);

  const handleFilterByCategory = (categoryId) => {
    const filteredPhotosList = originalPhotos.filter(
      (photo) => photo.category.id === categoryId
    );
    setPhotos(filteredPhotosList);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/snapstore/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const categoriesList = categories.map((category) => (
    <CategoryCard
      key={category.id}
      category={category}
      filterPhotosByCategory={handleFilterByCategory}
    />
  ));

  return (
    <div>
      <h4
        style={{
          fontWeight: "lighter",
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        Select a category to view photos available for it.
      </h4>
      <div className="buttonsContainer">{categoriesList}</div>
    </div>
  );
};

export default Categories;
