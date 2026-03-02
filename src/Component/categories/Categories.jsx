import React from "react";
import "./Categories.css";

const categories = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "For Rent: Houses & Apartments",
  "Beds-Wardrobes",
  "TVs, Video - Audio",
 
];

function Categories() {
    const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  return (
    <div className="category-wrapper">
      <button className="all-category-btn">
        ☰ ALL CATEGORIES
      </button>

      <div className="category-scroll">
        {categories.map((item, index) => (
          <div key={index} className="category-pill">
            {item}
          </div>
        ))}
                   
             <div className="separator"></div>


         <div className="current-date">
             
          {today}
        </div>

      </div>
    </div>
  );
}

export default Categories;