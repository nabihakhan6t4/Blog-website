import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 flex flex-col md:flex-row gap-5 p-4 rounded-3xl shadow-md hover:shadow-xl transition-all">

      {/* image */}
      <div className="md:w-1/3 overflow-hidden rounded-2xl">
        <img
          src={blog.thumbnail}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* content */}
      <div className="md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-gray-500 mt-2 line-clamp-2">
            {blog.subtitle}
          </p>
        </div>

        <Button
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="mt-4 w-fit rounded-xl"
        >
          Read More →
        </Button>
      </div>
    </div>
  );
};

export default BlogCardList;