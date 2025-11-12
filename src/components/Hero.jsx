import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroImg from "../assets/blog2.png";
const Hero = () => {
  return (
    <div className="px-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh] md:min-h-[600px] my-8 md:my-0">
        {/* 📝 Text Section */}
        <div className="text-center md:text-left max-w-xl mt-6 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Explore the Latest Tech & Web Trends
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-6">
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and tech innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
            <Link to="/blogs">
              <Button className="text-base sm:text-lg px-5 py-2 w-full sm:w-auto">
                Get Started
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                className="border-gray-400 px-5 py-2 text-base sm:text-lg w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* 🖼️ Image Section */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Hero"
            loading="lazy"
            className="w-64 sm:w-80 md:w-[500px] lg:w-[550px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
