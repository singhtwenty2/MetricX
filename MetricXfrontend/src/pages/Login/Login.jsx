import React from "react";
import assets from "../../assets/assets";
import Form from "./Form";
const Login = () => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2  ">
        <Form />
      </div>
      <div className=" hidden relative lg:flex  h-full bg-gray-900 items-center justify-center w-1/2">
        <div>
          <img src={assets.annimation1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
