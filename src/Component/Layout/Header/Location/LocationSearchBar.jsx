import React from 'react';
import "./LocationSearchBar.css";
import LocationPin from '../../../../assets/LocationPin'

const LocationSearchBar = ({ value = "India" }) => {
  return (
    <div className="location-search-bar">
      <div className="location-icon">
        <LocationPin />
      </div>
      
     <input
  type="text"
  placeholder="Search city, area or locality"
  defaultValue={value}
  className='location-input '
/>

      <button type="button" className="arrow-button">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 1024 1024" 
         
        >
          <path d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z"/>
        </svg>
      </button>
    </div>
  );
};

export default LocationSearchBar;