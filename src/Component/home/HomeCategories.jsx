import React from "react";
import "./HomeCategories.css";

const categories = [
  { name: "Cars", img: "https://apollo.olx.in/v1/files/hot2v0h3zj7e3-PANAMERA/image;original=true" },
  { name: "Bikes", img: "https://apollo.olx.in/v1/files/061nubs5o0n41-PANAMERA/image;original=true" },
  { name: "Properties", img: "https://apollo.olx.in/v1/files/cg8at2z182pb1-PANAMERA/image;original=true" },
  { name: "Electronics & Appliances", img: "https://apollo.olx.in/v1/files/q5vyhrmbai2f1-PANAMERA/image;original=true" },
  { name: "Mobiles", img: "https://apollo.olx.in/v1/files/tgkk5dwwnb6f1-PANAMERA/image;original=true" },
  { name: "Commercial Vehicles & Spares", img: "https://apollo.olx.in/v1/files/fryeeccguu4g2-PANAMERA/image;original=true" },
  { name: "Jobs", img: "https://apollo.olx.in/v1/files/n9ren4u78wjx2-PANAMERA/image;original=true" },
  { name: "Furniture", img: "https://apollo.olx.in/v1/files/xhdi5t1wrgmt3-PANAMERA/image;original=true" },
  { name: "Fashion", img: "https://apollo.olx.in/v1/files/58b6pme9xobo1-PANAMERA/image;original=true" },
  { name: "Pets", img: "https://apollo.olx.in/v1/files/09ki6io1155y2-PANAMERA/image;original=true" },
  { name: "Books, Sports & Hobbies", img: "https://apollo.olx.in/v1/files/2e0l1ni1ep641-PANAMERA/image;original=true" },
  { name: "Services", img: "https://apollo.olx.in/v1/files/w8xoeez49ut03-PANAMERA/image;original=true" },
];

const HomeCategories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="categories-container">
      <div
        className={`category-card ${selectedCategory === "" ? "active" : ""}`}
        onClick={() => setSelectedCategory("")}
      >
        <div className="image-box">
          <img src="https://img.icons8.com/ios/50/000000/menu--v1.png" style={{    width: '37px', height: '43px'}} alt="All Categories" />
        </div>
        <span>All</span>
      </div>

      {categories.map((item, index) => (
        <div
          key={index}
          className={`category-card ${selectedCategory === item.name ? "active" : ""}`}
          onClick={() => setSelectedCategory(item.name)}
        >
          <div className="image-box">
            <img src={item.img} alt={item.name} />
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeCategories;