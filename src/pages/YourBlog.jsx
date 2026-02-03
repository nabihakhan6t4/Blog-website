import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Card } from "../components/ui/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Trash, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
const YourBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog); // top-level hook

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-user-blogs",
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserBlogs();
  }, [dispatch]); // dependency array

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setBlog(blog.filter((b) => b._id !== id)));
        toast.success(res.data.message || "Blog deleted successfully ");
      }
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    }
  };

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>List of your recent blog posts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Title</TableHead>
                <TableHead scope="col">Category</TableHead>
                <TableHead scope="col">Date</TableHead>
                <TableHead scope="col" className="text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blog &&
                blog.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex gap-4 items-center">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-20 rounded-md hidden md:block"
                        />
                      )}
                      <h1
                        onClick={() => navigate(`/blogs/${item._id}`)}
                        className="hover:underline cursor-pointer"
                      >
                        {item.title}
                      </h1>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatDate(index)}</TableCell>

                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/dashboard/create-blog/${item._id}`)
                              }
                            >
                              <Edit />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => deleteBlog(item._id)}
                            >
                              <Trash className="text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;
