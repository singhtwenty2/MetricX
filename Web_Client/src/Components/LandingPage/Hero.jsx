import React from "react";
import assets from "../../assets/assets";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20" id="Hero">
      <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl text-center tracking-wide">
        Keep Your Website Running Smoothly
        <span className="lg:text-5xl sm:text-4xl ">
          {" "}
          with 24/7 Monitoring &
          <span className=" bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text ">
            {" "}
            Instant Alerts
          </span>
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Get real-time notifications and comprehensive insights to ensure your
        website is always performing at its best. Monitor uptime, detect issues
        instantly, and safeguard your online presence effortlessly
      </p>
      <div className="flex  text-center justify-center my-10">
        <a
          onClick={() => navigate("/dashboard")}
          className="getstarted cursor-pointer bg-gradient-to-r from-orange-500 to-orange-800 py-5 px-5  rounded-md transition transform hover:scale-95 duration-200"
        >
          get started
        </a>
        <a href="#" className="DOC py-3 mx-3 px-4 rounded-md border">
          Documentation
        </a>
      </div>
      {/* <div className="  flex  mt-10 justify-center  ">
        <img src={assets.logo} alt="" />
      </div> */}
      <div className="  flex  mt-10 justify-center  ">
        <video
          autoPlay
          loop
          muted
          className=" rounded-lg w-1/3  border border-orange-700 mx-2 my-4"
        >
          <source src={assets.video4} type="video/mp4" />
          Your browser doesnot support the video tag
        </video>
        <video
          autoPlay
          loop
          muted
          className=" rounded-lg w-1/3 border border-orange-700 mx-2 my-4"
        >
          <source src={assets.video3} type="video/mp4" />
          Your browser doesnot support the video tag
        </video>
      </div>
    </div>
  );
};

export default Hero;
