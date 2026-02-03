import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((blog) => blog._id === blogId);
  return <div>BlogView</div>;
};

export default BlogView;
