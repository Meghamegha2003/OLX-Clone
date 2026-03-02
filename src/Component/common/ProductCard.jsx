import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <li className="card-item">
      <Link to={`/view/${product.id}`} className="card-link">
        <div className="image-wrapper">
          <img src={product.images} alt={product.title} />

          {product.featured && <span className="badge">FEATURED</span>}

          <button
            className="heart"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
          >
            {liked ? <FaHeart className="filled" /> : <FaRegHeart />}
          </button>
        </div>

        <div className="card-content">
          <div className="price">{product.price}</div>
          {product.details && <div className="details">{product.details}</div>}
          <div className="title">{product.title}</div>
          <div className="bottom-row">
            <span>{product.location}</span>
            <span>{product.date}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;