import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import { setComments, addComment, setCommentText } from "../redux/commentSlice";
const CommentBox = ({ selectedBlog }) => {
  const { user } = useSelector((store) => store.auth);
 const { commentText, comments = [] } = useSelector((store) => store.comment || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedBlog?._id) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/comment/post/${selectedBlog._id}`,
        );
        dispatch(setComments(res.data.comments));
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [selectedBlog?._id, dispatch]);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/comment/${selectedBlog._id}`,
        { content: commentText },
        { withCredentials: true },
      );

      dispatch(addComment(res.data.comment));
      dispatch(setCommentText(""));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-xl">
      <div className="flex gap-4 mb-4 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.photoUrl} />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <h3 className="font-semibold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Textarea
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => dispatch(setCommentText(e.target.value))}
          className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
        />

        <Button onClick={handleSubmit} className="bg-gray-100 dark:bg-gray-800">
          <LuSend />
        </Button>
      </div>

      {comments.length > 0 && (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md ">
          {comments.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start ">
                  <Avatar>
                    <AvatarImage src={item?.userId?.photoUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="mb-2 space-y-1 md:w-100">
                    <h1>
                      {item?.userId?.firstName} {item?.userId?.lastName}
                    </h1>
                     <p className="text-gray-600 text-sm">
    {item?.content}
  </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
