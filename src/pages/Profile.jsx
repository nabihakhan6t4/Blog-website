import React from "react";
import { Card } from "../components/ui/card";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import userLogo from "../assets/user.jpg";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
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
              <AvatarImage src={userLogo} alt="User profile picture" />
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

              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Update your personal details and social links.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-5">
                  {/* Name in One Line */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      className="w-[277px]"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="about">Description</Label>
                    <Textarea
                      id="about"
                      placeholder="Tell something about yourself..."
                      className="text-gray-600"
                    />
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" placeholder="Facebook URL" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" placeholder="LinkedIn URL" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="github">GitHub</Label>
                      <Input id="github" placeholder="GitHub URL" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" placeholder="Instagram URL" />
                    </div>
                  </div>

                  <DialogFooter className="pt-2">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button type="submit" className="w-full sm:w-auto">
                      Save changes
                    </Button>
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
