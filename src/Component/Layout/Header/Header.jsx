import React, { useEffect, useState } from "react";
import Logo from "../../../assets/Logo";
import LocationSearchBar from "../../Layout/Header/Location/LocationSearchBar";
import SearchBar from "./SearchBar/SearchBar";
import "./Header.css";
import SellButton from "../../../assets/SellButton";
import SellButtonPlus from "../../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/Firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <header className="olx-header">
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

      <div className="header-center">
        <div className="header-item search-wrapper">
          <SearchBar />
        </div>
      </div>
      <div className="header-right">
        <div className="header-item wishlist-wrapper">
          <a href="/wishlist" className="header-btn vertical-btn">
            <svg
              width="28"
              height="25"
              viewBox="0 0 1024 1024"
              fill="none"
              stroke="#003670" // icon color
              strokeWidth="50"
            >
              <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811z" />
            </svg>
            <span style={{ color: "#003670" }}>Wishlist</span>
          </a>
        </div>

        <div className="header-item login-wrapper">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="header-btn vertical-btn"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      aria-label="Login"
            >
                <svg
        width="32px"
        height="32px"
        viewBox="6 -4 30 29"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 11.0003C24.5494 11.0003 28.25 14.7013 28.25 19.2503L27.333 20.1663H12.667L11.75 19.2503C11.75 14.7013 15.451 11.0003 20 11.0003ZM20 12.8333C16.7733 12.8333 14.0944 15.2281 13.6484 18.3333H26.3516C25.9056 15.2282 23.227 12.8334 20 12.8333ZM20 1.83331C22.2742 1.83331 24.125 3.68361 24.125 5.95831C24.125 8.23302 22.2743 10.0833 20 10.0833C17.7257 10.0833 15.875 8.23302 15.875 5.95831C15.875 3.68361 17.7258 1.83331 20 1.83331ZM20 3.66632C18.7364 3.66632 17.708 4.69471 17.708 5.95831C17.708 7.22194 18.7364 8.25031 20 8.25031C21.2636 8.25031 22.292 7.22194 22.292 5.95831C22.292 4.69471 21.2636 3.66632 20 3.66632Z" />
      </svg>
              <span style={{ color: "#003670" }}>Login</span>
            </button>
          ) : (
            <div className="profile-container">
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="profile-image"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="profile-dropdown">
                  <p className="profile-email">
                    {user.displayName || user.email}
                  </p>
                  <button
                    onClick={() => {
                      signOut(auth);
                      navigate("/login");
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="header-item sell-wrapper">
          <Link
            to="/postad"
            style={{ textDecoration: "none", color: "inherit" }}
          >
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
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
