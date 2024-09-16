import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Console from "./pages/Console/Console";
import Page404 from "./pages/404/Page404";
import KycForm from "./pages/KYC/Kyc";
import OTPInput from "./pages/Otp/OTPInput";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthContext";
import AuthGuard from "./Components/AuthGuard";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Route: Login */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/otp"
            element={
              <AuthGuard>
                <OTPInput />
              </AuthGuard>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/kyc"
            element={
              <ProtectedRoute>
                <KycForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/console"
            element={
              <ProtectedRoute>
                <Console />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
