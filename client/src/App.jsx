import React from 'react'
import './App.css'
import Header from './blog_components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blogs from './pages/Blogs'
import UserBlogs from './pages/UserBlogs'
import HomePage from './pages/HomePage'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import { ToastContainer } from 'react-toastify'

function App() {
   
  return (
    <div className='bg-bodyColor'>
    <BrowserRouter>
    <ToastContainer/>
    <Header/>
     <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/blogs' element={<Blogs/>}/>
        <Route path = '/my-blogs' element={<UserBlogs/>}/>
        <Route path = '/blog-details/:id' element={<BlogDetails/>}/>
        <Route path = '/create-blog' element={<CreateBlog/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/register' element={<Register/>}/>
     </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
