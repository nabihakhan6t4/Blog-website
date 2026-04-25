import React from "react";
import aboutImg from "../assets/About-blog.avif";

const About = () => {
  return (
    <div className="min-h-screen pt-28 px-4 md:px-0 mb-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="md:text-5xl text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            About Our Blog
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A place where ideas are shared, creativity is inspired, and
            developers grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={aboutImg}
              alt="About Blog"
              className="w-full h-[320px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="space-y-5">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-7">
              Welcome to our blog — a modern platform dedicated to sharing
              knowledge, ideas, and tutorials about web development and
              technology.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Our goal is to help developers of all levels learn, grow, and
              build real-world projects using modern technologies like React,
              JavaScript, Node.js, and full-stack development tools.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Whether you're just starting your journey or already an
              experienced developer, our content is designed to keep you
              updated, inspired, and motivated every step of the way.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-2xl text-gray-500 italic">
            “Words are powerful — use them to inspire.”
          </blockquote>

         
        </div>
      </div>
    </div>
  );
};

export default About;
