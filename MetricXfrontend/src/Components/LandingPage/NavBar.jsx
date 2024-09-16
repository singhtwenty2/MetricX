import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import assets from "../../assets/assets";
import { navItems } from "../../constants";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="  rknavbar sticky top-0  z-50 py-3 backdrop-blur-lg border-b  border-neutral-700/80 ">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex  flex-shrink-0 justify-between items-center">
          <div className="flex items-center  flex-shrink-0">
            <img
              className="h-10 w-30 mr-2"
              src={assets.logoTransparent}
              alt="Logo"
            />
          </div>

          <ul className="navbar-nav hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a className="hover:text-orange-500 " href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              onClick={() => navigate("/login")}
              className=" cursor-pointer py-2 border px-3 rounded-md hover:bg-orange-600 transition transform hover:scale-95 duration-200"
            >
              {" "}
              Sign In
            </a>
            <a
              onClick={() => navigate("/login")}
              className=" bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3  rounded-md  transition transform hover:scale-95 duration-200"
            >
              Create an Account
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className=" fixed right-0 z-20 bg-neutral-900 w-full p-12 flex justify-center items-center lg:hidden  flex-col ">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className=" signin flex space-x-6">
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer signinPatg py-2 border px-3 rounded-md"
              >
                {" "}
                Sign In
              </a>
              <a
                href="#"
                className=" bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3  rounded-md"
              >
                Create an Account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
