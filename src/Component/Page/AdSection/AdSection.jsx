import React from "react";
import "./AdSection.css";

const AdSection = () => {
  return (
    <div className="ad-container">
      <div className="ad-wrapper">
        <picture>
          <source
            type="image/jpeg"
            srcSet="https://apollo.olx.in/v1/files/alias-homepage-desktop-holi-list/image"
          />
          <img
            src="https://apollo.olx.in/v1/files/alias-homepage-desktop-holi-list/image"
            alt="Advertisement"
            className="ad-image"
          />
        </picture>
      </div>
    </div>
  );
};

export default AdSection;