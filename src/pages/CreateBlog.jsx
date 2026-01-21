import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20 ">
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Let's create a blog</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          modi fugiat nihil molestiae placeat, doloremque hic animi recusandae
          ab! Vel nihil rerum explicabo unde, obcaecati sapiente cum et alias
          tempora.
        </p>
        <div className="mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Your blog name "
              className="bg-white dark:bg-gray-700 mt-1"
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="mb-1">Category</Label>

            <Select>
              <SelectTrigger className="w-[180px]">
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
          <div className="flex gap-2">
            <Button>Create</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
