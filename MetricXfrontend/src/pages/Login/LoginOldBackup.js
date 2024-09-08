import React, { useState, useEffect } from "react";
import "./Form.css";
import assets from "../../assets/assets";

const Form2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State to track login/register mode

  // Use useEffect for real-time password matching
  useEffect(() => {
    if (isRegistering && confirmPassword && password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword, isRegistering]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering && password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
      console.log("Form submitted");
      // Perform the login or registration logic here
    }
  };

  return (
    <div className="bg-slate-800 px-10 py-10 rounded-3xl bottom-3 border-gray-500">
      <h1 className="text-3xl font-semibold bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
        {isRegistering ? "Hello, Register" : "Welcome Back"}
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-2">
        {isRegistering
          ? "Please enter your details to create an account."
          : "Welcome back! Please enter your details."}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          {/* Email Field */}
          <div className="text-lg font-medium">
            <label>Email</label>
            <input
              className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1 bg-transparent"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="text-lg font-medium mt-4">
            <label>Password</label>
            <input
              className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1 bg-transparent"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show Confirm Password only if Registering */}
          {isRegistering && (
            <div className="text-lg font-medium mt-4">
              <label>Confirm Password</label>
              <input
                className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1 bg-transparent"
                type="password"
                placeholder="Confirm your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          )}

          {/* Remember Me and Forgot Password */}
          {!isRegistering && (
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <a
                className="font-medium text-base text-orange-400 hover:text-orange-300"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="Signin bg-gradient-to-r from-orange-500 to-orange-800   text-white rounded-xl py-2 text-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-orange-400"
            >
              {isRegistering ? "Sign up" : "Sign in"}
            </button>
            <button className=" Signin flex items-center justify-center gap-2 border-2 border-gray-500 py-2 rounded-xl">
              <img className="w-7 h-8" src={assets.google} alt="Google" />
              <a href="">Sign in with Google</a>
            </button>
            <button className=" Signin flex items-center justify-center gap-2 border-2 border-gray-500 py-2 rounded-xl">
              <img className="w-7 h-8" src={assets.github_50} alt="Github" />
              <a href="">Sign in with Github</a>
            </button>
          </div>

          {/* Toggle between Login and Register */}
          <div className="mt-6 flex justify-center items-center">
            {isRegistering ? (
              <>
                <p>Already have an account?</p>
                <a
                  className="font-medium text-base text-orange-400  hover:text-orange-300 ml-2"
                  href="#"
                  onClick={() => setIsRegistering(false)}
                >
                  Sign in
                </a>
              </>
            ) : (
              <>
                <p>Don't have an account?</p>
                <a
                  className="font-medium text-base text-orange-400 hover:text-orange-300 ml-2"
                  href="#"
                  onClick={() => setIsRegistering(true)}
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form2;
