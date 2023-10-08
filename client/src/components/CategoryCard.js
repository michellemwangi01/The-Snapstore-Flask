import React from "react";

const CategoryCard = ({ category, filterPhotosByCategory }) => {
  const categoryId = category.id;

  const onClickHandler = () => {
    filterPhotosByCategory(categoryId);
  };

  return (
    <div>
      <button onClick={onClickHandler} className="categoryButtons">
        {category.name}
      </button>
    </div>
  );
};

export default CategoryCard;

//
