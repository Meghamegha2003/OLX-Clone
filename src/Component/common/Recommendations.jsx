import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./recommendations.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Recommendations = ({ selectedCategory }) => {
  const [ads, setAds] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchAds = async () => {
      const query = await getDocs(collection(db, "ads"));
      const adsData = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAds(adsData);
    };
    fetchAds();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const filteredAds = selectedCategory
    ? ads.filter((ad) => ad.category === selectedCategory)
    : ads;

  return (
    <div className="recommendations">
      <h2 className="heading">Fresh recommendations</h2>
      <ul className="card-container">
        {filteredAds.slice(0, visibleCount).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ul>
      {visibleCount < filteredAds.length && (
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