import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/LandingPage/NavBar";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Darshboard/DashBoard";
import Page404 from "./pages/404/Page404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
