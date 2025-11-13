import React from "react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import userLogo from "../assets/user.jpg";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
const Profile = () => {
  return (
    <div className="pt-24 md:ml-[320px] md:min-h-screen px-4">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-8 md:gap-10 p-4 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center md:w-[400px] ">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage  src={userLogo}  alt="User profile picture"/>
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3 ">
              Mern Stack Developer
            </h1>
            <div className="flex gap-4 items-center ">
              <Link>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
              </Link>
            </div>
          </div>
          {/* info section */}
          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-7 ">
              Welcome User
            </h1>
            <p>
              <span className="font-semibold">Email:</span>
              khanabiha923@gmail.com
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                I’m a passionate MERN stack developer who loves building
                responsive, user-friendly apps.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-4">
                  <div className="flex gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">First Name</Label>
                      <Input
                        id="name-1"
                        name="firstName"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Last Name</Label>
                      <Input
                        id="username-1"
                        name="lastName"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
