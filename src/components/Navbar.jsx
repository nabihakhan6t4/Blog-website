import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
  const user = false;

  return (
    <div className="py-2 fixed w-full dark:bg-gray-800 border-b dark:border-gray-700 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="flex gap-7 items-center">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <img
                src={Logo}
                alt="Logo"
                className="w-7 h-7 md:w-10 md:h-10 dark:invert"
              />
              <h1 className="font-bold text-3xl md:text-4xl">Logo</h1>
            </div>
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px]"
            />
            <Button className="absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>

        {/* Nav Section */}
        <nav className="flex md:gap-7 gap-4 items-center">
          <ul className="hidden md:flex gap-7 items-center text-xl font-semibold">
            <Link to="/"><li>Home</li></Link>
            <Link to="/blogs"><li>Blogs</li></Link>
            <Link to="/about"><li>About</li></Link>
          </ul>

          <div className="flex items-center">
            <Button>
              <FaMoon />
            </Button>

            {user ? (
              <div></div>
            ) : (
              <div className="ml-7 flex gap-2">
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
