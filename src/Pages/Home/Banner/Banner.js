import React from "react";
import banner from "../../../assets/Banner.jpeg";

const Banner = () => {
  return (
    <div
      className="hero sm:w-full lg:min-h-screen"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-xl lg:text-5xl font-bold text-white">
            Wanna trade or find best Mobile Phone with reasonable prices?
          </h1>
          <p className="mb-5 text-white">
            We are offering best sale and trade services for used Mobile phones.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
