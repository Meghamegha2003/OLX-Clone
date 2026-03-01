import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <li className="card-item">
      <div className="image-wrapper">
        <img src={product.image} alt={product.title} />

        {product.featured && (
          <span className="badge">FEATURED</span>
        )}

        <span
          className="heart"
          onClick={() => setLiked(!liked)}
        >
          {liked ? <FaHeart className="filled" /> : <FaRegHeart />}
        </span>
      </div>

      <div className="card-content">
        <div className="price">{product.price}</div>

        {product.details && (
          <div className="details">{product.details}</div>
        )}

        <div className="title">{product.title}</div>

        <div className="bottom-row">
          <span>{product.location}</span>
          <span>{product.date}</span>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;