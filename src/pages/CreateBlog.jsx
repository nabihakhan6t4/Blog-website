import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBlog } from "../redux/blogSlice";
import { toast } from "sonner";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((store) => store.blog);

  console.log(blog);

  const handleCreate = async () => {
    if (!title || !category) {
      toast.error("Please fill in both title and category!");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/blog",
        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        if (!blog) {
          dispatch(setBlog([res.data.blog]));
          toast.success(res.data.message);
        }
        dispatch(setBlog([...blog, res.data.blog]));
        setTitle("");
        setCategory("");
        navigate(`/dashboard/create-blog/${res.data.blog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error("Failed to create blog!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog. Please try again!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20 ">
      <Card className="md:p-10 p-4 dark:bg-gray-800 -space-y-6">
        <h1 className="text-2xl font-bold">Let's create a blog</h1>
        <p>
          Welcome! Here you can create your very own blog post. Give it a catchy
          title, choose the right category, and share your thoughts with the
          world. Let's get your ideas published and seen by everyone!
        </p>
        <div className="mt-10">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Your blog name "
              className="bg-white dark:bg-gray-700 mt-1"
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="mb-1">Category</Label>

            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Blog Categories</SelectLabel>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button disabled={loading} onClick={handleCreate}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin " /> Creating
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
