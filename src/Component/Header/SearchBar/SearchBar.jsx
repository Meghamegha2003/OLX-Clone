import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <input type="text" placeholder="Search" defaultValue="Mobiles" />
        <button type="submit" className="search-btn">
          <svg width="26" height="26" viewBox="6 15 1024 900" fill="#fff">
            <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;