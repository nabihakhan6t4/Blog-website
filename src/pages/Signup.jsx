import React from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "../components/ui/sonner";
import axios from "axios";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    console.log(e);

    const { name, value } = e.target;
    setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        user
      );

      if (res.data.success) {
        toast.success("Account created successfully!");
        console.log("User registered:", res.data);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="flex h-screen md:pt-14 md:h-[760px]">
      <div className="hidden md:block">
        <img src={auth} alt="" className="h-[700px] " />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card className="w-full max-w-md p-6 shadow-lg  rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900 "
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900 "
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900 "
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900 "
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-6 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !user.firstName ||
                  !user.lastName ||
                  !user.email ||
                  !user.password
                }
              >
                Sign Up
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300 ">
                Already have an account?
                <Link to="/login">
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
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
