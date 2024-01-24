import BlogCard from '@/blog_components/BlogCard';
import API_BASE_URL from '@/config/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async() => {
     try {
      const {data} = await axios.get(`${API_BASE_URL}/blog/all-blog`);
      if(data?.success){
        setBlogs(data?.blogs)
        // toast.success('All blogs fetched successfully')
      }
     } catch (error) {
        toast.error(error);
     }
  }
  //load blogs when component mount
  useEffect(()=>{
      getAllBlogs();
  },[])
  // console.log(blogs);
  return (
    <div className='container w-full flex flex-1 gap-5 justify-center flex-wrap content-center flex-col sm:flex-row py-5 '>
      {blogs && blogs.map(blog  => (
        <BlogCard 
        Id =  {blog._id} 
        isUser = {localStorage.getItem("userId") === blog.user._id}
        title = {blog.title} 
        desc = {blog.description}
        image = {blog.image}
        user = {blog.user.username}
        className="max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-2xl "/>
      ))}
    </div>
  )
}

export default Blogs