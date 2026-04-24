import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { setBlog } from "../redux/blogSlice";
const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { blog } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((blog) => blog._id === blogId);
  const isLiked = selectedBlog?.likes?.includes(user?._id);
  const likeCount = selectedBlog?.likes?.length;

  console.log(selectedBlog);
  const formatDate = () => {
    if (!selectedBlog?.createdAt) return "";

    const date = new Date(selectedBlog.createdAt);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;

    if (navigator.share) {
      navigator
        .share({
          title: selectedBlog?.title,
          text: selectedBlog?.subtitle,
          url: blogUrl,
        })
        .then(() => {
          console.log("shared successfully");
        })
        .catch((err) => {
          console.error("Error sharing", err);
        });
    } else {
      // fallback copy to clipboard
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("blog link copy to clipboard");
      });
    }
  };

  const handleLikeToggle = async () => {
    try {
      const action = isLiked ? "unlike" : "like";
      const method = isLiked ? "delete" : "post";

      const res = await axios({
        method,
        url: `http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`,
        withCredentials: true,
      });

      if (res.data.success) {
        const updatedBlogData = blog.map((p) =>
          p._id === selectedBlog._id
            ? {
                ...p,
                likes: isLiked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p,
        );

        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
  <div className="pt-14 bg-gray-50 dark:bg-gray-950 min-h-screen">
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/blogs">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-500">
                {selectedBlog?.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
        {selectedBlog?.title}
      </h1>

      {/* Author */}
      <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={selectedBlog?.author?.photoUrl} />
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate()}
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={selectedBlog?.thumbnail}
          alt="thumbnail"
          className="w-full h-[420px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* Subtitle */}
      <p className="mt-4 text-gray-500 italic">
        {selectedBlog?.subtitle}
      </p>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none mt-10">
        <div dangerouslySetInnerHTML={{ __html: selectedBlog?.description }} />
      </div>

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-2">
        {["Next.js", "React", "Web Development", "JavaScript"].map((tag) => (
          <Badge
            key={tag}
            className="rounded-full px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-5">

        <div className="flex items-center gap-4">

          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-2"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" size={20} />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-red-500" size={20} />
            )}
            <span className="text-sm">{likeCount}</span>
          </button>

          <button className="flex items-center gap-2 text-gray-500">
            <MessageSquare size={18} />
            <span className="text-sm">1 comment</span>
          </button>

        </div>

        <div className="flex items-center gap-3">

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
            <Bookmark size={18} />
          </button>

          <button
            onClick={() => handleShare(selectedBlog._id)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Share2 size={18} />
          </button>

        </div>

      </div>
    </div>
  </div>
);
};

export default BlogView;
