import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user ,loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    file: user?.photoUrl,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("occupation", input.occupation);
    formData.append("bio", input.bio);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("github", input.github);
    formData.append("instagram", input.instagram);

    if (input?.file) {
      formData.append("file", input?.file);
    }

    try {
      console.log("FormData ready 🚀");
      dispatch(setLoading(true));
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-24 md:ml-[320px] md:min-h-screen px-4">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex md:flex-row flex-col gap-8 md:gap-10 p-4 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center md:w-[400px] ">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage
                src={user?.photoUrl || userLogo}
                alt="User profile picture"
              />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3 ">
              {user.occupation || "Mern Stack Developer"}
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
              Welcome {user?.firstName || "User"} !
            </h1>
            <p>
              <span className="font-semibold">Email:</span>
              {user?.email}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                {user?.bio ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae et sunt sequi, unde, rerum enim perspiciatis nobis, voluptatem repudiandae odio repellendus modi possimus saepe suscipit recusandae laudantium doloremque eius soluta!"}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>

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
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeHandler}
                      />
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
                      onChange={fileChangeHandler}
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="about">Description</Label>
                    <Textarea
                      id="about"
                      placeholder="Tell something about yourself..."
                      className="text-gray-600"
                      name="bio"
                      value={input.bio}
                      onChange={changeHandler}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={input.facebook}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        placeholder="LinkedIn URL"
                        name="linkedin"
                        value={input.linkedin}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        placeholder="GitHub URL"
                        name="github"
                        value={input.github}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={input.instagram}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>

                  <DialogFooter className="pt-2">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                      type="submit"
                      onClick={submitHandler}
                      className="w-full sm:w-auto"
                    >
                     {}
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
