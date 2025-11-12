import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setLoading } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("Please fill in all fields! 🚨");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Account created! 🎉");
        navigate("/login");
        setUserState({ firstName: "", lastName: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong! 🚫");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[760px]">
      {/* Left image */}
      <div className="hidden md:flex flex-1">
        <img
          src={auth}
          alt="Signup Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form */}
      <div className="flex flex-1 justify-center items-center px-4 md:px-8">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700 transition-all">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl md:text-3xl font-bold">
                Create an account
              </h1>
            </CardTitle>
            <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* First & Last Name */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Create a Password"
                  className="dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full py-2 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              {/* Login Link */}
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="underline hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
