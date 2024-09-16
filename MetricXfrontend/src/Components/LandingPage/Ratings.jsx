import React from "react";
import { testimonials } from "../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Ratings = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  return (
    <div className="w-3/4 m-auto  " id="Testimonials">
      <div className="mt-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center my-10 lg:my-20 font-bold">
          What people are saying
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className=" bg-black h-[450px]  w-[800px] text-white rounded-xl"
            >
              <div className=" bg-gradient-to-r from-orange-700 to-orange-900 h-48 rounded-t-xl flex justify-center items-center">
                <img
                  className="h-32 ,w-32 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.user}
                />
              </div>
              <div className="flex flex-col justify-center items-center  p-4">
                <h1 className="font-bold text-xl">{testimonial.user}</h1>
                <p className="test-sm font-normal italic text-neutral-600 mb-1">
                  {testimonial.company}
                </p>
                <p className="flex mb-5 text-yellow-400   w-42 h-30 gap-1">
                  {testimonial.Rating}
                </p>
                <p className="font-thin mb-5">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Ratings;
