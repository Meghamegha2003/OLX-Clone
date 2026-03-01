import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-columns">

          <div className="footer-column">
            <h4>Popular Locations</h4>
            <ul>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Trending Locations</h4>
            <ul>
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li>About OLX India</li>
              <li>Tech@OLX</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>OLX</h4>
            <ul>
              <li>Blog</li>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy</li>
            </ul>
          </div>
          <div className="footer-column">
  <h4>Follow Us</h4>

  <div className="social-icons">
    <img
      src="https://apollo.olx.in/v1/files/alias-facebook-icon/image;original=true"
      alt="Facebook"
    />
    <img
      src="https://apollo.olx.in/v1/files/alias-instagram-icon/image;original=true"
      alt="Instagram"
    />
    <img
      src="https://apollo.olx.in/v1/files/alias-youtube-icon/image;original=true"
      alt="YouTube"
    />
    <img
      src="https://apollo.olx.in/v1/files/alias-twitter-icon/image;original=true"
      alt="Twitter"
    />
    <img
      src="https://apollo.olx.in/v1/files/alias-whatsapp-icon/image;original=true"
      alt="WhatsApp"
    />
    <img
      src="https://apollo.olx.in/v1/files/alias-linkedin-icon/image;original=true"
      alt="LinkedIn"
    />
  </div>
   <div className="app-links">
            <img src="https://statics.olx.in/external/base/img/playstore_3x.png" alt="Playstore" />
            <img src="https://statics.olx.in/external/base/img/appstore_3x.png" alt="Appstore" />
          </div>
</div>

        </div>

   
      </div>

      <div className="footer-bottom">
        <div className="brands">
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" alt="CarTrade" />
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx_2025.svg?v=1" alt="OLX" />
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" alt="Carwale" />
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" alt="Bikewale" />
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" alt="Cartrade" />
          <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" alt="Mobility" />
        </div>

        

        <div className="copyright">
          All rights reserved © 2006-2026 OLX
        </div>
      </div>

    </footer>
  );
};

export default Footer;