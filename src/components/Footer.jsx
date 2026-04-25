import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="w-12 h-12 invert" />
            <h1 className="text-3xl font-bold text-white">Blog</h1>
          </Link>

          <p className="mt-3 text-sm leading-6">
            Sharing insights, tutorials, and ideas about modern web development
            and technology.
          </p>

          <div className="mt-4 text-sm space-y-1">
            <p>📍 123 Blog Street, Style City, NY 10001</p>
            <p>📧 support@blog.com</p>
            <p>📞 (123) 456-7890</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white transition">Home</Link></li>
            <li><Link className="hover:text-white transition">Blog</Link></li>
            <li><Link className="hover:text-white transition">About Us</Link></li>
            <li><Link className="hover:text-white transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl mt-2">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitterSquare /></a>
            <a href="#" className="hover:text-red-400 transition"><FaPinterest /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Stay Updated
          </h3>

          <p className="text-sm leading-6">
            Subscribe to receive the latest blog posts, updates, and free resources.
          </p>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md text-black focus:outline-none bg-gray-700 focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 px-4 rounded-r-md text-white hover:bg-red-700 transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} <span className="text-red-500 font-medium">Blog</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;