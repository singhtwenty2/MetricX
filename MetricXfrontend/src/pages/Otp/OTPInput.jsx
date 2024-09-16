import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OTP = ({ length, value, onChange }) => {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (index) => {
    const targetInput = inputRefs.current[index];
    if (targetInput) targetInput.focus();
  };

  const handleChange = (event, index) => {
    const newValue = event.target.value;
    if (newValue.match(/^\d$/)) {
      onChange((prevOtp) => {
        const otpArray = prevOtp.split("");
        otpArray[index] = newValue;
        if (index < length - 1) focusInput(index + 1);
        return otpArray.join("");
      });
    }
  };

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        if (index > 0) {
          focusInput(index - 1);
        }
        onChange(
          (prevOtp) => prevOtp.slice(0, index) + prevOtp.slice(index + 1)
        );
        break;
      case "ArrowRight":
        event.preventDefault();
        if (index < length - 1) focusInput(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (index > 0) focusInput(index - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value[index] ?? ""}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="bg-gray-200 font-semibold w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-black"
        />
      ))}
    </div>
  );
};

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // To store backend messages
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsResendEnabled(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async () => {
    if (otp.length === 6 && otp.match(/^\d{6}$/)) {
      setError("");
      setMessage(""); // Clear previous messages

      // Retrieve email and password from local storage
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        setError("Email and password are not found in local storage.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:9707/api/v1/auth/verify-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp, email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to verify OTP");
        }

        localStorage.setItem("authToken", data.token); // Save the token to local storage
        navigate("/login"); // Redirect to login page
      } catch (error) {
        setMessage(error.message || "Failed to verify OTP. Please try again.");
      }
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResend = async () => {
    if (isResendEnabled) {
      setOtp("");
      setIsResendEnabled(false);
      setTimer(60); // Start the 1-minute countdown

      // Retrieve email and password from local storage
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!email || !password) {
        setMessage("Email and password are not found in local storage.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:9707/api/v1/auth/resend-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to resend OTP");
        }

        setMessage("OTP Resent.");
      } catch (error) {
        setMessage(error.message || "Failed to resend OTP. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-orange-500">
          OTP Verification
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Please enter the OTP you received on your email.
        </p>
        <OTP length={6} value={otp} onChange={setOtp} />
        {error && (
          <p className="text-red-500 text-center mt-4 bg-red-100 p-2 rounded-lg border border-red-500">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-500 text-center mt-4 bg-green-100 p-2 rounded-lg border border-green-500">
            {message}
          </p>
        )}
        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit OTP
          </button>
          <button
            onClick={handleResend}
            disabled={!isResendEnabled}
            className="bg-gray-200 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            {isResendEnabled ? `Resend OTP` : `Resend in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
}
