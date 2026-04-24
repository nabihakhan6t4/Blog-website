import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCardList from "./BlogCardList";
import { setBlog } from "../redux/blogSlice";
import { Badge } from "./ui/badge";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";

const RecentBlog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/blog", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-16">
      <div className="text-center mb-12">
       <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
  Recent Blogs
</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Fresh insights, tutorials & dev updates
        </p>
        <div className="w-28 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          {blog?.slice(0, 4)?.map((b) => (
            <div
              key={b._id}
              className="transform hover:-translate-y-1 transition duration-300"
            >
              <BlogCardList blog={b} />
            </div>
          ))}
        </div>

        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-xl h-fit hidden md:block">
          <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Popular Categories
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {["React", "JavaScript", "Node.js", "UI/UX", "MongoDB"].map(
              (item) => (
                <Badge
                  key={item}
                  className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  {item}
                </Badge>
              ),
            )}
          </div>

          <div className="mt-6 space-y-3">
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Subscribe
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get latest blogs & updates directly in your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-red-400"
              />
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold  mb-3">
              Suggested Blogs
            </h2>
           <ul className="space-y-3 ">
{[
  " 10 Tips to Master React Like a Pro",
  " Tailwind CSS Tricks Every Developer Should Know",
  " Improve Website SEO in 2026 (Step-by-Step Guide)",
  " JavaScript Concepts You Keep Forgetting",
  " Node.js Performance Optimization Hacks",
  " How to Build Clean UI Like a Senior Dev",
].map((item, idx) => (
  <li
    key={idx}
    className=" text-sm dark:text-gray-100 hover:underline   cursor-pointer "
  >
    {item}
  </li>
))}
           </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
