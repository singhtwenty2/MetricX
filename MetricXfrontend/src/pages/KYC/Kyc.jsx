import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress, // MUI Loader component
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const KycForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyName: "",
    teamSize: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isKycDone, setIsKycDone] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkKycStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login page if no token
        return;
      }

      setLoading(true); // Start loader before API call
      try {
        const response = await axios.get(
          "http://localhost:9707/api/v1/kyc/status",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Send token with the request
            },
          }
        );

        if (response.status === 200) {
          const { isKycDone } = response.data;
          if (isKycDone) {
            setIsKycDone(true);
            navigate("/Console"); // Redirect to Console page if KYC is done
          }
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          switch (status) {
            case 401:
              setErrorMessage("Unauthorized. Please log in again.");
              navigate("/login"); // Redirect to login page if unauthorized
              break;
            default:
              setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
        console.error("Error checking KYC status", error);
      } finally {
        setLoading(false); // Stop loader after API call
      }
    };

    checkKycStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("User is not authenticated. Please log in.");
      return;
    }

    setLoading(true); // Start loader before form submission
    try {
      const response = await axios.post(
        "http://localhost:9707/api/v1/kyc/insert",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token with the request
          },
        }
      );

      if (response.status === 201) {
        // Backend returns 201 for successful creation
        setSuccessMessage(response.data.successMessage);
        setFormData({
          firstName: "",
          lastName: "",
          role: "",
          companyName: "",
          teamSize: "",
        });
        setTimeout(() => {
          navigate("/Console"); // Redirect to Console page after success
        }, 1000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 400:
            setErrorMessage("Bad Request. Please check the input.");
            break;
          case 404:
            setErrorMessage("Endpoint not found. Please check the API URL.");
            break;
          case 500:
            setErrorMessage("Server error. Please try again later.");
            break;
          case 401:
            setErrorMessage("Unauthorized. Please log in again.");
            navigate("/login"); // Redirect to login page if unauthorized
            break;
          default:
            setErrorMessage("Network error. Please check your connection.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
      console.error("Error submitting form", error);
    } finally {
      setLoading(false); // Stop loader after form submission
    }
  };

  if (isKycDone) {
    // If KYC is done, redirect to Console
    return null;
  }

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-600 p-6">
      <Box className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h1 className="text-orange-600 font-bold mb-4 text-center text-3xl underline">
          KYC Form
        </h1>
        {/* Loader and form display logic */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100px"
          >
            <CircularProgress /> {/* MUI Circular Loader */}
          </Box>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            {/* Role Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                <MenuItem value="Product Owner">Product Owner</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            {/* Team Size Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="teamSize-label">Team Size</InputLabel>
              <Select
                labelId="teamSize-label"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                required
              >
                <MenuItem value="1-10">1-10</MenuItem>
                <MenuItem value="11-50">11-50</MenuItem>
                <MenuItem value="51-100">51-100</MenuItem>
                <MenuItem value="100+">100+</MenuItem>
              </Select>
            </FormControl>

            {errorMessage && (
              <Box className="mt-2 text-red-600 text-center">
                {errorMessage}
              </Box>
            )}

            {successMessage && (
              <Box className="mt-2 text-green-600 text-center">
                {successMessage}
              </Box>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4 bg-orange-600 hover:bg-orange-700 mx-auto"
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default KycForm;
