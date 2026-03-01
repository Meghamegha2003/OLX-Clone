import React from "react";
import "./OLXPromotedGrid.css";

const OLXPromotedGrid = ({ items }) => {
  return (
    <div className="promoted-container">
      <div className="promoted-header">
        PROMOTED CONTENT
      </div>

      <div className="promoted-grid">
        {items.map((item) => (
          <div key={item.id} className="promoted-card">
            <div className="media-wrapper">
              {item.isVideo ? (
                <video
                  src={item.mediaUrl}
                  muted
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                />
              )}
            </div>

            <div className="promoted-content">
              <div className="promoted-source">
                {item.source}
              </div>
              <h3 className="promoted-title">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OLXPromotedGrid;