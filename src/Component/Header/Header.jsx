import React from 'react';
import Logo from '../../assets/Logo';
import LocationSearchBar from './Location/LocationSearchBar';
import SearchBar from './SearchBar/SearchBar';
import './Header.css';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

const Header = () => {
  return (
    <header className="olx-header">

      {/* LEFT SECTION */}
      <div className="header-left">

        <div className="header-item logo-wrapper">
          <div className="logo-container">
            <Logo />
          </div>
        </div>

        <div className="header-item location-wrapper">
          <LocationSearchBar />
        </div>

      </div>

      {/* CENTER SECTION */}
      <div className="header-center">
        <div className="header-item search-wrapper">
          <SearchBar />
        </div>
      </div>
<div className="header-right">

  <div className="header-item wishlist-wrapper">
    <a href="/wishlist" className="header-btn vertical-btn" >
      <svg
        width="28"
        height="25"
        viewBox="0 0 1024 1024"
        fill="none"
        stroke="#003670"   // icon color
        strokeWidth="50"
        
      >
        <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811z"/>
      </svg>
      <span style={{ color: "#003670" }}>Wishlist</span>
    </a>
  </div>

  <div className="header-item login-wrapper">
    <button type="button" className="header-btn vertical-btn">
      <svg
        width="32"
        height="32"
        viewBox="6 -4 30 29"
        fill="#003670"   // icon color
      >
        <path d="M20 11C24.549 11 28.25 14.701 28.25 19.25L27.333 20.166H12.667L11.75 19.25C11.75 14.701 15.451 11 20 11ZM20 12.833C16.773 12.833 14.094 15.228 13.648 18.333H26.352C25.906 15.228 23.227 12.833 20 12.833ZM20 1.833C22.274 1.833 24.125 3.684 24.125 5.958C24.125 8.233 22.274 10.083 20 10.083C17.726 10.083 15.875 8.233 15.875 5.958C15.875 3.684 17.726 1.833 20 1.833ZM20 3.666C18.736 3.666 17.708 4.695 17.708 5.958C17.708 7.222 18.736 8.25 20 8.25C21.264 8.25 22.292 7.222 22.292 5.958C22.292 4.695 21.264 3.666 20 3.666Z"/>
      </svg>
      <span style={{ color: "#003670"}}>Login</span>
    </button>
  </div>

  <div className="header-item sell-wrapper">
    <div className="sellMenu">

      <div className="sell-button-wrapper">
        <SellButton color="#020812" />
      </div>

      <div className="sellMenuContent">

        <div className="sell-plus-wrapper">
          <SellButtonPlus color="#020812" />
        </div>

        <div className="sell-text-wrapper">
          <span>SELL</span>
        </div>

      </div>

    </div>
  </div>

</div>
    </header>
  );
};

export default Header;