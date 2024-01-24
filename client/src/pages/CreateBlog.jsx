import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import API_BASE_URL from '@/config/apiConfig'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  title: z
  .string()
  .min(10,{message: "Title should contain at least 10 characters"}),
  
  description: z.string(),
  image: z.string()
})

const CreateBlog = () => {

  const navigate = useNavigate();

  const user = localStorage.getItem("userId");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSubmit = async (blogFormData) => {
    const blogData = {...blogFormData, user};
    console.log(blogData);
    try {
      // const {name, email, password} = userData;
     const {data} = await axios.post(`${API_BASE_URL}/blog/create-blog`, blogData)
    //  console.log(data);
     if(data?.success){
      toast.success('Blog Created successfully');
      navigate('/my-blogs');
     }
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <div className='container w-4/5 text-center pb-10'>
    <h1 className='text-3xl font-bold border-b-2 border-b-gray-500'>Create Your Blog</h1>
     <Form {...form}>
    <form  className="space-y-8"  onSubmit={form.handleSubmit(handleSubmit)}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input 
              placeholder="Enter blog title" {...field} 
              type="text"
              className='border-black' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input 
              placeholder="Enter blog description" {...field}
              type = "text" 
              className='border-black' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image Url</FormLabel>
            <FormControl>
              <Input 
              placeholder="Enter url for blog image" {...field}
              type = "text" 
              className='border-black' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='container flex items-center justify-around'>
        <Button className="text-bodyColor" type="submit">Submit Blog</Button>
      </div>
    </form>
  </Form>
  </div>
  )
}

export default CreateBlog