
import React from 'react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/redux/store'
import { toast } from 'react-toastify'


const Header = () => {
  const navigate = useNavigate()

  // Get the login status from Redux state
  const isLogin = useSelector(state => state.isLogin);

  // Check if the user is logged in based on state or local storage
  const isLoggedIn = isLogin || localStorage.getItem('userId');

  const dispatch = useDispatch();

  // console.log(isLogin);

  const handleLogOut = () => {
    try {
      dispatch(authActions.logout());
      toast.success('User Successfully Logout');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
   <div className='container flex justify-between bg-black py-5 sticky top-0 md:flex-row  flex-col items-center h-60 md:h-1/4 '>
      <h1 className='text-3xl text-bodyColor'>Blog Post App</h1>
      {isLoggedIn && (
       <div className='flex text-white flex-col md:flex-row w-full md:w-1/2 justify-between items-center font-bold'>
       <span className='bg-bodyColor text-black px-5 cursor-pointer shadow-lg rounded pb-1 mb-2 md:mb-0 '>
         <Link to='/blogs'>Blogs</Link>
       </span>
       <span className='bg-bodyColor text-black px-5 cursor-pointer shadow-lg rounded pb-1 mb-2 md:mb-0'>
         <Link to='/my-blogs'>My Blogs</Link>
       </span>
       <span className='bg-bodyColor text-black px-5 cursor-pointer shadow-lg rounded pb-1 mb-2 md:mb-0'>
         <Link to='/create-blog'>Create Blog</Link>
       </span>
     </div>
      )}
      <Menubar className='bg-bodyColor '>
        <MenubarMenu className='flex space-x-4 gap-x-6'>
          {!isLoggedIn ? (
            <>
              <Button className='text-bodyColor'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button className='text-bodyColor'>
                <Link to='/register'>Register</Link>
              </Button>
            </>
          ) : (
            <Button className='text-bodyColor' onClick={handleLogOut}>Logout</Button>
          )}
        </MenubarMenu>
      </Menubar>
    </div>
    </>
  )
}

export default Header