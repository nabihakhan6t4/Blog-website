import React from 'react'
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
} from "../components/ui/select"

    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

const CreateBlog = () => {
  return (
    <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-20 '>
     <Card className='md:p-10 p-4 dark:bg-gray-800'>
      <h1 className='text-2xl font-bold'>Let's create a blog</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda modi fugiat nihil molestiae placeat, doloremque hic animi recusandae ab! Vel nihil rerum explicabo unde, obcaecati sapiente cum et alias tempora.</p>
      <div className='mt-10'>
        <div>
          <Label>
            Title
          </Label>
<Input type='text' placeholder='Your blog name ' className='bg-white dark:bg-gray-700'/>
        </div>

      </div>

     </Card>
      
    </div>
  )
}

export default CreateBlog