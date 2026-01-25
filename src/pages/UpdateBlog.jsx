import React, { useRef, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import JoditEditor from "jodit-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateBlog = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blog, loading } = useSelector((store) => store.blog);
  const selectedBlog = blog.find((b) => b._id === blogId);

  const [blogData, setBlogData] = useState({
    title: selectedBlog?.title || "",
    subtitle: selectedBlog?.subtitle || "",
    description: selectedBlog?.description || "",
    category: selectedBlog?.category || "",
    thumbnail: selectedBlog?.thumbnail || "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(
    selectedBlog?.thumbnail || ""
  );

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (value) => {
    setBlogData((prev) => ({ ...prev, category: value }));
  };

  // Handle thumbnail file upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Update blog handler
  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);

    if (blogData.thumbnail instanceof File) {
      formData.append("file", blogData.thumbnail);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(-1); // Navigate back after success
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="md:ml-[320px] pt-20 px-3 pb-10">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-6 space-y-6 rounded-xl shadow-md">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold">Edit Blog</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Update your blog details below. Click <strong>Publish</strong> when ready.
            </p>
          </div>

          {/* Top Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={updateBlogHandler}
              disabled={loading}
            >
              {loading ? "Updating..." : "Publish"}
            </Button>
            <Button type="button" variant="destructive">
              Remove Blog
            </Button>
          </div>

          {/* Title */}
          <div className="mt-6">
            <Label className="mb-1">Title</Label>
            <Input
              type="text"
              placeholder="Enter blog title"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
              className="dark:border-gray-300"
            />
          </div>

          {/* Subtitle */}
          <div className="mt-6">
            <Label className="mb-1">Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter blog subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleInputChange}
              className="dark:border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <Label className="mb-1">Description</Label>
            <JoditEditor
              ref={editorRef}
              value={blogData.description}
              onChange={(newContent) =>
                setBlogData((prev) => ({ ...prev, description: newContent }))
              }
              className="jodit_toolbar mt-2"
            />
          </div>

          {/* Category */}
          <div className="mt-6">
            <Label className="mb-2">Category</Label>
            <Select value={blogData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
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

          {/* Thumbnail */}
          <div className="mt-6">
            <Label className="mb-1">Thumbnail</Label>
            <Input
              type="file"
              className="w-fit dark:border-gray-300"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-64 my-2 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={updateBlogHandler} disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
