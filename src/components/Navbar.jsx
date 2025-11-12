import React, { useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaRegEdit,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";
import {
  ChartColumnBig,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { LiaCommentSolid } from "react-icons/lia";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message || "Logged out successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b dark:border-gray-700 shadow-md z-50">

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 md:px-6 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-8 h-8 md:w-10 md:h-10 dark:invert"
          />
          <h1 className="font-bold text-xl md:text-2xl">Logo</h1>
        </Link>

        {/* Search & Hamburger */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden md:flex items-center border rounded-md overflow-hidden dark:border-gray-700">
            <Input
              type="text"
              placeholder="Search..."
              className="border-0 dark:bg-gray-900 bg-gray-300 focus:ring-0"
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="text-gray-700 dark:text-gray-300" />
            </Button>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            className="transition-transform duration-300 hover:rotate-90"
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-700" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </Button>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:max-h-none md:opacity-100 transition-all overflow-hidden w-full md:flex md:w-auto flex-col md:flex-row md:items-center gap-3 md:gap-7 mt-2 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:gap-7 w-full md:w-auto">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                <li
                  className={`py-1 md:py-0 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${
                    location.pathname === link.path
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {link.name}
                </li>
              </NavLink>
            ))}
          </ul>

          {/* Auth buttons */}
          {user ? (
            <div className="relative flex items-center gap-3 mt-2 md:mt-0">
              <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                  <button>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark:bg-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/profile")}
                    >
                      <User />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/your-blog")}
                    >
                      <ChartColumnBig />
                      <span>Your Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/comments")}
                    >
                      <LiaCommentSolid />
                      <span>Comments</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/write-blog")}
                    >
                      <FaRegEdit />
                      <span>Write Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={loading}>
                    <LogOut />
                    <span>{loading ? "Logging out..." : "Log out"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
              <Link to="/login">
                <Button variant="outline" className="w-full md:w-auto">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full md:w-auto">Signup</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
