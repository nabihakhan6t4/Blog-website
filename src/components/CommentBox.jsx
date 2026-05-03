import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  setComments,
  addComment,
  setCommentText,
} from "../redux/commentSlice";

import { Edit, Trash } from "lucide-react";

const CommentBox = ({ selectedBlog }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const { commentText, comments = [] } = useSelector(
    (store) => store.comment || {}
  );

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // 💬 Fetch comments
  useEffect(() => {
    if (!selectedBlog?._id) return;

    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8000/api/v1/comment/post/${selectedBlog._id}`
        );

        if (res.data.success) {
          dispatch(setComments(res.data.comments));
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [selectedBlog?._id, dispatch]);

  // ✍️ input change
  const handleCommentChange = (e) => {
    dispatch(setCommentText(e.target.value));
  };

  // ➕ post comment
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedBlog?._id) return;

    try {
      setPosting(true);

      const res = await axios.post(
        `http://localhost:8000/api/v1/comment/${selectedBlog._id}`,
        { content: commentText },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(addComment(res.data.comment));
        dispatch(setCommentText(""));
        toast.success("Comment posted successfully! 🎉");
      }
    } catch (error) {
      toast.error("Failed to post comment 😢");
      console.log(error);
    } finally {
      setPosting(false);
    }
  };

  // 🗑️ delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/comment/${commentId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          setComments(
            comments.filter((comment) => comment._id !== commentId)
          )
        );
        toast.success("Comment deleted 🗑️");
      }
    } catch (error) {
      toast.error("Failed to delete comment");
      console.log(error);
    }
  };

  // ✏️ save edit (FIXED — this was missing!)
  const handleSaveEdit = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/comment/${commentId}`,
        { content: editedContent },
        { withCredentials: true }
      );

      if (res.data.success) {
        const updated = comments.map((c) =>
          c._id === commentId ? { ...c, content: editedContent } : c
        );

        dispatch(setComments(updated));

        setEditingCommentId(null);
        setEditedContent("");

        toast.success("Comment updated ✨");
      }
    } catch (error) {
      toast.error("Failed to update comment");
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-xl">

      {/* USER */}
      <div className="flex gap-4 mb-4 items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.photoUrl} />
          <AvatarFallback>
            {user?.firstName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <h3 className="font-semibold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>

      {/* INPUT */}
      <div className="flex flex-col gap-3 mb-6">
        <Textarea
          placeholder="Write your comment..."
          value={commentText}
          onChange={handleCommentChange}
          className="bg-gray-100"
        />

        <Button
          onClick={handleCommentSubmit}
          disabled={posting}
          className="flex items-center gap-2"
        >
          <LuSend />
          {posting ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* COMMENTS */}
      {comments.length > 0 && (
        <div className="mt-7 bg-gray-100 p-5 rounded-md">
          {comments.map((item) => (
            <div key={item._id} className="mb-4 flex gap-3">

              <Avatar>
                <AvatarImage src={item?.userId?.photoUrl} />
                <AvatarFallback>
                  {item?.userId?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">

                <h1 className="font-semibold">
                  {item?.userId?.firstName} {item?.userId?.lastName}
                  <span className="text-sm ml-2 font-light text-gray-500">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </span>
                </h1>

                {/* EDIT MODE */}
                {editingCommentId === item._id ? (
                  <>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="mb-2 bg-gray-200"
                    />

                    <div className="flex gap-2">
                      <Button onClick={() => handleSaveEdit(item._id)}>
                        Save
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditedContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-600 text-sm">{item?.content}</p>
                )}

                {/* ACTIONS */}
                <div className="flex gap-5 items-center">
                  <div className="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <FaRegHeart />
                    <span>{item?.numberOfLikes || 0}</span>
                  </div>

                  <p className="text-sm cursor-pointer hover:underline">
                    Reply
                  </p>
                </div>
              </div>

              {/* MENU */}
              {user?._id === item?.userId?._id && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <BsThreeDots />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingCommentId(item._id);
                        setEditedContent(item.content);
                      }}
                    >
                      <Edit /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleDeleteComment(item._id)}
                      className="text-red-500"
                    >
                      <Trash /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;