import React, { useState, useEffect } from "react";

import {
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Username state
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // For password strength error
  const [isRegistering, setIsRegistering] = useState(false); // Determine if the user is registering
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Regular expression for password validation (uppercase, lowercase, number, special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);

    // Validate password strength
    if (!passwordRegex.test(input)) {
      setPasswordError(
        "Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }

    // Check if passwords match in real-time
    if (confirmPassword && input !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  // Handle confirm password change with real-time checking
  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);

    if (input !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check password strength when registering
    if (isRegistering && passwordError) {
      return;
    }

    // Check if passwords match when registering
    if (isRegistering && password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      console.log("Form submitted");
      // Perform the login or registration logic here
    }
  };

  return (
    // <Box
    //   className="bg-slate-800 px-10 py-10 rounded-3xl bottom-3 border-gray-500" // Tailwind background color
    // >
    <Box
      className="flex flex-col items-center p-6 m-10 bg-white  rounded-lg shadow-lg max-w-md w-full" // Tailwind styling
    >
      <h1 className=" text-3xl bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text font-extrabold">
        {isRegistering ? "Hello, Register" : "Welcome Back"}
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-2">
        {isRegistering
          ? "Please enter your details to create an account."
          : "Welcome back! Please enter your details."}
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Username Field, only if Registering */}
        {isRegistering && (
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mb-4 "
          />
        )}

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Show Confirm Password only if Registering */}
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
            FormHelperTextProps={{
              style: { color: errorMessage ? "red" : "inherit" },
            }}
            required
            className="mb-4"
          />
        )}

        {/* Remember Me and Forgot Password */}
        {!isRegistering && (
          <Box className=" flex justify-between items-center mt-2">
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
          style={{ marginBottom: "16px", marginTop: "6px" }} // Adding margin using inline styles
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isRegistering ? "Register" : "Sign In"}
        </Button>

        {/* Sign in with social media */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          style={{ marginBottom: "16px", marginTop: "6px" }} // Consistent margin across all buttons
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GitHubIcon />}
          style={{ marginTop: "10px" }} // Top margin for the last button
        >
          Sign in with GitHub
        </Button>
      </form>

      {/* Toggle between Login and Register */}
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
            <p className="text-black ">Don't have an account?</p>
            <a
              onClick={() => setIsRegistering(true)}
              className="text-orange-600 cursor-pointer hover:underline"
            >
              Sign Up
            </a>
          </>
        )}
      </Box>
    </Box>
    // </Box>
  );
};

export default Form;
