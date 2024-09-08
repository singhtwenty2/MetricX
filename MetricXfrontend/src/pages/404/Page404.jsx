import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>
        <h1 className="text-4xl font-bold mb-5 flex justify-center">
          404 Error:{" "}
          <span className="text-orange-500 text-5xl ml-2">Page Not Found</span>
        </h1>
        <p className="flex justify-center tracking-wide ">
          You lost somewhere{" "}
        </p>
      </div>
      <div>
        <Link to="/" className="text-orange-800 hover:underline text-lg mt-4">
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default Page404;
