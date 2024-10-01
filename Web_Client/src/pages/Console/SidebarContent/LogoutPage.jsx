// // src/pages/LogoutPage.js
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LogoutPage = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform logout logic here
//     // For now, we simply redirect to the login page
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Are you sure you want to log out?</h1>
//       <button onClick={handleLogout}>Log Out</button>
//     </div>
//   );
// };

// export default LogoutPage;

import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="font-bold text-lg flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-orange-800 py-5 px-5 min-h-screen">
      <h1>Console page</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutPage;
