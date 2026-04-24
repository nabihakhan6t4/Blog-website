import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <div className="overflow-hidden rounded-2xl">
        <img
          src={blog.thumbnail}
          alt="blog"
          className="aspect-video w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* meta */}
      <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
        ✍️ {blog.author.firstName} • {blog.category} • {formattedDate}
      </p>

      {/* title */}
      <h2 className="text-lg font-semibold mt-2 line-clamp-2 group-hover:text-blue-500 transition">
        {blog.title}
      </h2>

      {/* subtitle */}
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {blog.subtitle}
      </p>

      {/* button */}
      <Button
        onClick={() => navigate(`/blogs/${blog._id}`)}
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white"
      >
        Read More →
      </Button>
    </div>
  );
};

export default BlogCard;