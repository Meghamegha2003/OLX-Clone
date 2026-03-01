import React, { useState } from "react";
import ProductCard from "./ProductCard";
import products from "./RecommendationData";
import "./recommendations.css";

const Recommendations = () => {
  const [visibleCount, setVisibleCount] = useState(8); // show first 8

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // load 4 more each click
  };

  return (
    <div className="recommendations">
      <h2 className="heading">Fresh recommendations</h2>

      <ul className="card-container">
        {products.slice(0, visibleCount).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ul>

      {visibleCount < products.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;