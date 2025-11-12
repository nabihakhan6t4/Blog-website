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
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUserState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields! 🚨");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message || "Login successful! 🎉");
        setUserState({ email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials! 🚫");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-[760px]">
      {/* Left Image */}
      <div className="hidden md:flex flex-1">
        <img
          src={auth}
          alt="Login illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form */}
      <div className="flex flex-1 justify-center items-center px-4 md:px-8">
        <Card className="w-full max-w-md p-6 md:p-8 shadow-2xl rounded-2xl dark:bg-gray-800 dark:border-gray-700 transition-all">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-2xl md:text-3xl font-bold">
                Log in to your account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
              Enter your details below to login
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email address"
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
                  placeholder="Enter your password"
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
                  "Login"
                )}
              </Button>

              {/* Signup Link */}
              <p className="text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="underline hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer">
                    Sign Up
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

export default Login;
