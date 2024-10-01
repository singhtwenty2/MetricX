import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Import Public pages
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import OTPInput from "./pages/Otp/OTPInput";
import Page404 from "./pages/404/Page404";

// Import Protected pages
import KycForm from "./pages/KYC/Kyc";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthContext";
import AuthGuard from "./Components/AuthGuard";

// Import Console and its components
import Console from "./pages/Console/Sidebar/Console";
import DashboardHome from "./pages/Console/SidebarContent/DashboardHome";
import ClusterPage from "./pages/Console/SidebarContent/ClusterPage";
import EscalationPage from "./pages/Console/SidebarContent/EscalationPage";
import AnalyticsPage from "./pages/Console/SidebarContent/AnalyticsPage";
import AlertHistoryPage from "./pages/Console/SidebarContent/AlertHistoryPage";
import SettingsPage from "./pages/Console/SidebarContent/SettingsPage";
import LogoutPage from "./pages/Console/SidebarContent/LogoutPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Route: Login */}
          <Route path="/login" element={<Login />} />

          {/* OTP Route - AuthGuard ensures authentication */}
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

          {/* Console with nested routes, protected */}
          <Route
            path="/console"
            element={
              <ProtectedRoute>
                <Console />
              </ProtectedRoute>
            }
          >
            {/* Default Dashboard Home route */}
            <Route index element={<DashboardHome />} />
            <Route path="cluster" element={<ClusterPage />} />
            <Route path="escalation" element={<EscalationPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="alert-history" element={<AlertHistoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
