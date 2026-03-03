import React, { useEffect, useState } from "react";
import "./Categories.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

function Categories({ setSelectedCategory, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const query = await getDocs(collection(db, "ads"));
      const ads = query.docs.map((doc) => doc.data());
      const uniqueCategories = [...new Set(ads.map((ad) => ad.category))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="category-wrapper">
      <button
        className={`all-category-btn ${selectedCategory === "" ? "active" : ""}`}
        onClick={() => handleClick("")}
      >
        ☰ ALL CATEGORIES
      </button>

      <div className="category-scroll">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`category-pill ${selectedCategory === item ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
        <div className="separator"></div>
        <div className="current-date">{today}</div>
      </div>
    </div>
  );
}

export default Categories;