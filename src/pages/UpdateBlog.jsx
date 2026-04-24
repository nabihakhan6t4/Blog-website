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
import { setLoading } from "../redux/blogSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateBlog = () => {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blog, loading } = useSelector((store) => store.blog);
  const selectedBlog = blog?.find((b) => b._id === blogId);

  const [formData, setFormData] = useState({
    title: selectedBlog?.title || "",
    subtitle: selectedBlog?.subtitle || "",
    description: selectedBlog?.description || "",
    category: selectedBlog?.category || "",
    thumbnail: selectedBlog?.thumbnail || "",
  });
  const [isPublished, setIsPublished] = useState(
    selectedBlog?.isPublished || false,
  );
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState(
    selectedBlog?.thumbnail || "",
  );

  if (!selectedBlog) return <p>Loading blog...</p>;

  // Text input change
  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Category change
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Update blog
  const handleUpdateBlog = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("description", formData.description);
    data.append("category", formData.category);

    if (formData.thumbnail instanceof File) {
      data.append("file", formData.thumbnail);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Toggle publish/unpublish
  const handleTogglePublishStatus = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/blog/${blogId}/toggle-publish`,
        {}, // no body needed if backend toggles internally
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsPublished(!isPublished);
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update publish status");
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Delete blog
  const handleDeleteBlog = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${blogId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/blogs");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
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
              Update your blog details below. Click <strong>Publish</strong>{" "}
              when ready.
            </p>
          </div>

          {/* Top Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button onClick={handleTogglePublishStatus} disabled={loading}>
              {isPublished ? "Unpublish" : "Publish"}
            </Button>

            <Button variant="destructive" onClick={handleDeleteBlog}>
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
              value={formData.title}
              onChange={handleTextInputChange}
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
              value={formData.subtitle}
              onChange={handleTextInputChange}
              className="dark:border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <Label className="mb-1">Description</Label>
            <JoditEditor
              ref={editorRef}
              value={formData.description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description: content }))
              }
              className="jodit_toolbar mt-2"
            />
          </div>

          {/* Category */}
          <div className="mt-6">
            <Label className="mb-2">Category</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full sm:w-45">
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
              onChange={handleThumbnailUpload}
            />
            {thumbnailPreviewUrl && (
              <img
                src={thumbnailPreviewUrl}
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
            <Button onClick={handleUpdateBlog} disabled={loading}>
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
