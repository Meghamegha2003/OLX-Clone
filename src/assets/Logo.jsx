import React from 'react';

function Logo() {
  return (
    <div >
      <picture>
        <source 
          type="image/svg+xml" 
          srcSet="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg" 
        />
        <img 
          src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg" 
          alt="OLX India" 
          style={{width:"50px", height:"50px"}}
        />
      </picture>
    </div>
  );
}

export default Logo;