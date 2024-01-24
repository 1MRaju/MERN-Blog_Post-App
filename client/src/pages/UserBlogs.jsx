import BlogCard from '@/blog_components/BlogCard';
import API_BASE_URL from '@/config/apiConfig';
import { authActions } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const UserBlogs = () => {
  const dispatch = useDispatch();
  const [blogPosts, setBlogPosts] = useState([]);
  const [userName, setUserName] = useState('');

  // const blogPostsReload = useSelector((state) => state.auth.userBlogs);
  // const isLogin = useSelector(state => state.isLogin);
  const isReload = useSelector(state => state.userBlogs);

  const id = localStorage.getItem('userId');
  console.log(id);

  // console.log(blogPosts);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const {data} = await axios.get(`${API_BASE_URL}/blog/user-blog/${id}`)
      // console.log(data); 
      if(data?.success){
        setBlogPosts(data?.userBlog.blogs)
        setUserName(data?.userBlog.username)
        // toast.success('User blogs fetched Successfully')
      }
    } catch (error) {
        toast.error(error);
    }  
  }

  useEffect(() => {
    if (isReload) {
      getUserBlogs();
      dispatch(authActions.reSetUserBlogs());
    }
  }, [isReload, dispatch]);

  useEffect(() => {
    getUserBlogs();
  },[ ])

  console.log(blogPosts);
  return (
    <div className='container w-full flex flex-1 gap-5 justify-center flex-wrap content-center py-5'>
    {blogPosts && blogPosts.length > 0 ? (blogPosts.map(blog => (
          <BlogCard 
          Id =  {blog._id} 
          isUser = {localStorage.getItem("userId") === blog.user}
          title = {blog.title} 
          desc = {blog.description}
          image = {blog.image}
          user = {userName}
          className="max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-2xl"/>
    ))):(
      <div  className='text-center'>
        <h1>Yet You Havent created Any Blogs</h1>
      </div>
      )}
  </div>
  )
}

export default UserBlogs