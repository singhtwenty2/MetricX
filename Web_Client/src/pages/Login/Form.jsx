import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress, // MUI Loader component
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);

    if (!passwordRegex.test(input)) {
      setPasswordError(
        "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }

    if (confirmPassword && input !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);

    if (input !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("✅");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering && (passwordError || password !== confirmPassword)) {
      setServerMessage("Please fix the errors before submitting");
      setIsError(true);
      return;
    }

    setServerMessage("");
    setErrorMessage("");
    setLoading(true); // Start loader before API call

    try {
      const url = isRegistering
        ? "http://localhost:9707/api/v1/auth/signup"
        : "http://localhost:9707/api/v1/auth/login";
      const requestData = { email, password };

      const response = await axios.post(url, requestData);

      if (response.status === 200 || response.status === 202) {
        const result = response.data;

        if (isRegistering) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          setServerMessage(
            result.successMessage ||
              "User created successfully! Please verify OTP."
          );
          setIsError(false);
          navigate("/otp");
        } else if (result.accessToken && result.refreshToken) {
          // Store token and refresh token in local storage
          localStorage.setItem("token", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);

          // Store timestamps for when the tokens were saved
          const currentTime = new Date().toISOString(); // Current time in ISO format
          localStorage.setItem("tokenTimestamp", currentTime);
          localStorage.setItem("refreshTokenTimestamp", currentTime);

          // Remove sensitive information from localStorage
          localStorage.removeItem("email");
          localStorage.removeItem("password");

          setServerMessage("Login successful! Redirecting...");
          setIsError(false);

          // Check if token and refresh token exist to determine redirection
          if (
            localStorage.getItem("token") &&
            localStorage.getItem("refreshToken")
          ) {
            setTimeout(() => navigate("/kyc"), 2000);
          }
        }
      } else if (response.status === 409) {
        setServerMessage(response.data.errorMessage || "User already exists");
        setIsError(true);
      } else {
        setServerMessage(
          response.data.errorMessage ||
            "Something went wrong, please try again."
        );
        setIsError(true);
      }
    } catch (error) {
      console.error("Error response data:", error.response?.data);
      setServerMessage(
        error.response?.data?.errorMessage || "An error occurred"
      );
      setIsError(true);
    } finally {
      setLoading(false); // Stop loader after API call
    }
  };

  return (
    <Box className="flex flex-col items-center p-6 m-10 bg-white rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-3xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-extrabold">
        {isRegistering ? "Hello, Register" : "Welcome Back"}
      </h1>
      <p className="font-medium text-lg text-gray-300 mt-2">
        {isRegistering
          ? "Please enter your details to create an account."
          : "Welcome back! Please enter your details."}
      </p>

      {/* Loader Display */}
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
        <form onSubmit={handleSubmit} className="w-full">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            required
            className="mb-4"
          />

          {isRegistering && (
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              required
              className="mb-4"
            />
          )}

          {!isRegistering && (
            <Box className="flex justify-between items-center mt-2">
              <FormControlLabel
                className="text-orange-600 text-bold"
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label="Remember Me"
              />
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </Box>
          )}

          <Button
            style={{ marginBottom: "16px", marginTop: "6px" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {isRegistering ? "Register" : "Sign In"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            style={{ marginBottom: "16px", marginTop: "6px" }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GitHubIcon />}
            style={{ marginTop: "10px" }}
          >
            Sign in with GitHub
          </Button>
        </form>
      )}

      <Box className="mt-4 text-center">
        {isRegistering ? (
          <>
            <p className="text-black">Already have an account?</p>
            <a
              onClick={() => setIsRegistering(false)}
              className="text-orange-600 cursor-pointer hover:underline"
            >
              Sign In
            </a>
          </>
        ) : (
          <>
            <p className="text-black">Don't have an account?</p>
            <a
              onClick={() => setIsRegistering(true)}
              className="text-orange-600 cursor-pointer hover:underline"
            >
              Sign Up
            </a>
          </>
        )}
      </Box>

      {serverMessage && (
        <Alert severity={isError ? "error" : "success"} className="mt-4">
          <h4 className="font-semibold">{serverMessage}</h4>
        </Alert>
      )}
    </Box>
  );
};

export default Form;
