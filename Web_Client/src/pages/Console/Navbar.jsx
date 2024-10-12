// import React from "react";
// import "./Navbar.css";
// import assets from "../../assets/assets";

// const Navbar = () => {
//   return (
//     <div className="navbar sticky top-0 z-10 w-full flex justify-between items-center bg-[#0e0e0e]">
//       {/* Logo */}
//       <img
//         src={assets.logowhite}
//         alt="Company Logo"
//         className="logo h-10 w-28 ml-4 cursor-pointer"
//       />
//       <div className="flex justify-between items-center gap-5 mx-4 py-2">
//         {/* Search Box */}
//         <div className="searchBox mr-16 flex items-center">
//           <img
//             className="h-6 w-6 cursor-pointer"
//             src={assets.SearchBlack}
//             alt="Search"
//           />
//           <input type="text" placeholder="Search" className="border p-2" />
//         </div>

//         {/* Theme Toggle */}
//         <div>
//           <img
//             className="h-6 cursor-pointer"
//             src={assets.day}
//             alt="Theme Toggle"
//           />
//         </div>

//         {/* Notifications Icon */}
//         <img
//           className="h-8 cursor-pointer"
//           src={assets.notificationNight}
//           alt="Notifications"
//         />

//         {/* User Profile */}
//         <div>
//           <img
//             className="h-10 rounded-full cursor-pointer"
//             src={assets.profileDark}
//             alt="User Profile"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import "./Navbar.css";
import assets from "../../assets/assets";
import axios from "axios";
import { Box, Card, CardContent, Typography } from "@mui/material"; // MUI for Card
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false); // Toggle for Profile Card
  const [kycDetails, setKycDetails] = useState(null); // State to hold KYC details
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // For potential navigation

  // Fetch KYC details from backend
  const fetchKycDetails = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors

      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      // API call to fetch KYC details
      const response = await axios.get(
        "http://localhost:9707/api/v1/kyc/fetch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setKycDetails(response.data); // Set KYC details in state
      } else {
        setError("Failed to fetch KYC details.");
      }
    } catch (error) {
      console.error("Error fetching KYC details:", error);
      setError("An error occurred while fetching KYC details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Image Click
  const handleProfileClick = () => {
    if (!showProfileCard) {
      fetchKycDetails(); // Fetch KYC details if profile card is not shown
    }
    setShowProfileCard(!showProfileCard); // Toggle profile card visibility
  };

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
            onClick={handleProfileClick} // Toggle profile card on click
          />
        </div>
      </div>

      {/* Profile Card */}
      {showProfileCard && (
        <Box
          className="absolute right-4 top-14 w-80 bg-white shadow-lg rounded-md p-1 z-20"
          sx={{ backgroundColor: "#f3f4f6" }} // Custom card background color for the outer box
        >
          {loading ? (
            <p>Loading...</p> // Loading state
          ) : error ? (
            <p className="text-red-500">{error}</p> // Error message
          ) : (
            kycDetails && (
              <Card
                sx={{
                  background: "linear-gradient(to right, #c05621, #7c2d12)", // Gradient from orange-700 to orange-900
                  color: "#ffffff", // White text
                  borderRadius: "15px", // Rounded corners
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Card shadow
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    KYC Details
                  </Typography>
                  <Box
                    className="grid grid-cols-1 gap-4 mt-4"
                    sx={{ fontWeight: "bold" }}
                  >
                    <Typography variant="body1">
                      Name: {kycDetails.firstName} {kycDetails.lastName}
                    </Typography>

                    <Typography variant="body1">
                      Phone Number: {kycDetails.phoneNumber}
                    </Typography>
                    <Typography variant="body1">
                      Company: {kycDetails.companyName}
                    </Typography>
                    <Typography variant="body1">
                      Job Title: {kycDetails.jobTitle}
                    </Typography>
                    <Typography variant="body1">
                      Address: {kycDetails.address}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )
          )}
        </Box>
      )}
    </div>
  );
};

export default Navbar;
