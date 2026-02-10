import React from "react";
import { useSelector } from "react-redux";
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
import { FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const { blog } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((blog) => blog._id === blogId);
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
        toast.success("blog link copy to clipboard")
      });
      
    }
  };

  return (
    <div className="pt-14 ">
      <div className="max-w-6xl mx-auto p-10 ">
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
                <Link to="">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {selectedBlog.title} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* blog header */}

        <div className="my-1 ">
          <h1 className="text-4xl font-bold tracking-tight">
            {" "}
            {selectedBlog.title}{" "}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4 ">
            <div className="flex items-center space-x-4 ">
              <Avatar>
                <AvatarImage src={selectedBlog.author.photoUrl} alt="author" />
                <AvatarFallback> NK </AvatarFallback>
              </Avatar>
              <div>
                <p className="fon-medium">
                  {selectedBlog.author.firstName}{" "}
                  {selectedBlog.author.lastName}{" "}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Published on {formatDate()}
              </p>
            </div>
          </div>
        </div>

        {/* featured image */}

        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={selectedBlog.thumbnail}
            alt="thumbnail"
            width={1000}
            height={500}
            className="w-ful; object-cover"
          />
          <p className="text-sm text-muted-foreground mt-2 italic ">
            {" "}
            {selectedBlog.subtitle}{" "}
          </p>
        </div>

        <p dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />

        <div className="mt-10">
          <div className="flex flex-wrap gap-2 mb-8 ">
            <Badge variant="secondary" className="dark:bg-gray-800">
              {" "}
              Next.js{" "}
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              {" "}
              React{" "}
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              {" "}
              Web Development{" "}
            </Badge>
            <Badge variant="secondary" className="dark:bg-gray-800">
              {" "}
              Javascript{" "}
            </Badge>
          </div>

          {/* engagement */}
          <div className="flex items-center justify-between border-y dark:border-gray-800  border-gray-300  py-4 mb-8  ">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center gap-1">
                {" "}
                <FaRegHeart
                  size={24}
                  className="cursor-pointer hover:text-gray-600 text-white "
                />{" "}
                <span> 0 </span>
              </Button>
              <Button variant="ghost">
                <MessageSquare className="h-4 w-4" />
                <span>1 comments</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button onClick={handleShare} variant="ghost">
                <Share2 className="w-4 h-4 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
