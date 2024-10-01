// FloatingActionButton.jsx
import React from "react";
import { FaPlus } from "react-icons/fa"; // Import any icon library, or use text if you don't want an icon.
import "./FloatingActionButton.css"; // Create a CSS file for styling the button.

const FloatingActionButton = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      <FaPlus className="fab-icon" />{" "}
      {/* You can replace this with text if you prefer */}
    </button>
  );
};

export default FloatingActionButton;
