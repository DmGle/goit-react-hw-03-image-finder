import React from 'react';

const ImageGalleryItem = ({ imageUrl, onImageClick }) => {
  const handleClick = () => {
    onImageClick(imageUrl);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img src={imageUrl} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;