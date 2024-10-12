import React, { useState, useNavigate } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { BsGraphDownArrow } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { LuAlertTriangle } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Navbar from "../Navbar"; // Assuming you have a Navbar component
import "./Console.css";
import FloatingActionButton from "./FAB/FloatingActionButton";

const Console = () => {
  const handleCreateCluster = () => {
    alert("Create Cluster button clicked!"); // You can open a modal or navigate to a page
  };
  const menus = [
    {
      name: "Dashboard",
      link: "/console",
      icon: MdOutlineDashboard,
    },
    { name: "Cluster", link: "/console/cluster", icon: ImTree },
    {
      name: "Escalation",
      link: "/console/escalation",
      icon: BsGraphDownArrow,
    },
    {
      name: "Analytics",
      link: "/console/analytics",
      icon: TbReportAnalytics,
    },
    {
      name: "Alert History",
      link: "/console/alert-history",
      icon: LuAlertTriangle,
    },
    {
      name: "Setting",
      link: "/console/settings",
      icon: IoSettingsOutline,
      margin: true,
    },
    { name: "Logout", link: "/console/logout", icon: FiLogOut },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col">
      <Navbar /> {/* Sticky Navbar */}
      <section className="flex">
        {/* Sidebar */}
        <div
          className={`sidebar bg-[#0e0e0e] fixed top-14 ${
            open ? "w-72" : "w-16"
          } h-full duration-500 text-gray-300 px-4`}
          style={{ zIndex: 10 }} // Ensure it's above other content
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>

          {/* Sidebar Menu */}
          <div className="mt-4 flex flex-col gap-4">
            {menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`${
                  menu.margin ? "mt-60 lg:mt-60 sm:mt-6" : ""
                } flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  style={{ transitionDelay: `${i + 3}00ms` }}
                >
                  {menu.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          className="main-content flex-1  bg-white text-gray-900 text-xl font-semibold overflow-y-auto"
          style={{
            marginLeft: open ? "18rem" : "4rem", // Adjust margin based on sidebar width
            transition: "margin-left 0.5s", // Smooth transition
          }}
        >
          {/* Outlet for rendering the content of the clicked page */}
          <Outlet />
        </div>
      </section>
      <div>
        <FloatingActionButton onClick={handleCreateCluster} />
      </div>
    </div>
  );
};

export default Console;
