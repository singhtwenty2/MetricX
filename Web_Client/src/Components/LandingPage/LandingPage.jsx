import React from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Features from "./Features";
import WorkFlow from "./WorkFlow";
// import Testimonials from "./Testimonials";
import Ratings from "./Ratings";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Hero />
      </div>
      <section>
        <Features />
      </section>
      <WorkFlow />
      {/* <Testimonials /> */} {/* this testimonial is in card format */}
      <Ratings /> {/* this testimonial is in slider format */}
      <Footer />
    </div>
  );
};

export default LandingPage;
