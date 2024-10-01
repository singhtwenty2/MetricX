import React from "react";
import "./Navbar.css";
import assets from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-10 w-full flex justify-between items-center bg-[#0e0e0e]">
      {/* Logo */}
      <img
        src={assets.logowhite}
        alt="Company Logo"
        className="logo h-10 w-28 ml-4 cursor-pointer"
      />
      <div className="flex justify-between items-center gap-5 mx-4 py-2">
        {/* Search Box */}
        <div className="searchBox mr-16 flex items-center">
          <img
            className="h-6 w-6 cursor-pointer"
            src={assets.SearchBlack}
            alt="Search"
          />
          <input type="text" placeholder="Search" className="border p-2" />
        </div>

        {/* Theme Toggle */}
        <div>
          <img
            className="h-6 cursor-pointer"
            src={assets.day}
            alt="Theme Toggle"
          />
        </div>

        {/* Notifications Icon */}
        <img
          className="h-8 cursor-pointer"
          src={assets.notificationNight}
          alt="Notifications"
        />

        {/* User Profile */}
        <div>
          <img
            className="h-10 rounded-full cursor-pointer"
            src={assets.profileDark}
            alt="User Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
