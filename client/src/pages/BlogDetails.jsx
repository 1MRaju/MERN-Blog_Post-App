import axios from 'axios';
import React, { useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from '@/config/apiConfig';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  title: z.string().min(10, {message: "Title should contain at least 10 characters"}),
  description: z.string(),
  image: z.string()
})

const BlogDetails = () => {

  const id = useParams().id

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  //get blog details
  const getBlogDetail = async () => {
        try {
          const {data} = await axios.get(`${API_BASE_URL}/blog/get-blog/${id}`)
          if(data?.success){
               // Set default form values after fetching the blog details
                form.setValue("title", data?.blog.title);
                form.setValue("description", data?.blog.description);
                form.setValue("image", data?.blog.image);
          }
        } catch (error) {
          toast.error(error)
        }
  }

  const handleSubmit = async (blogFormData) => {

    try {
      // const {name, email, password} = userData;
     const {data} = await axios.put(`${API_BASE_URL}/blog/update-blog/${id}`, blogFormData)
     console.log(data);
     if(data?.success){
      toast.success('Blog Updated successfully');
      navigate('/my-blogs');
     }
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(()=>{
    getBlogDetail()
  },[id]);

  // console.log(blog);

  return (
    <div className='container w-4/5 text-center'>
    <h1 className='text-3xl font-bold border-b-2 border-b-gray-500'>Edit Your Blog</h1>
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
              placeholder="Edit blog title" {...field} 
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
              placeholder="Edit blog description" {...field}
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
              placeholder="Edit url for blog image" {...field}
              type = "text" 
              className='border-black' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='container flex items-center justify-around'>
        <Button type="submit">Submit Blog</Button>
      </div>
    </form>
  </Form>
  </div>
  )
}

export default BlogDetails


