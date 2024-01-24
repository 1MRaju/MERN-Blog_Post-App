import React from 'react'
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '@/redux/store'
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
  email: z.string().email(),

  password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters" }),

  confirmPassword: z.string()
}).refine((data)=>{
  return data.password === data.confirmPassword
},
{
  message: "Passwords must match",
  path: ["confirmPassword"]
})

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (userData) => {
    // console.log(userData);
    try {
      // const {name, email, password} = userData;
     const {data} = await axios.post(`${API_BASE_URL}/user/login`, userData)
    //  console.log(data);
     if(data.success){
      localStorage.setItem("userId", data?.user._id);
      dispatch(authActions.login());
      toast.success('Login successful');
      navigate('/blogs');
     }else {
       navigate('/register');
       toast.warning('You dont have account, Please Register');
     }
    } catch (error) {
      toast.error(error);
    }
  };
 
  return (
    <>
    <div className='container w-4/5 text-center pb-10'>
      <h1 className='text-3xl font-bold border-b-2 border-b-gray-500'>Login</h1>
       <Form {...form}>
      <form  className="space-y-8"  onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter your email" {...field} 
                type="email"
                className='border-black' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                placeholder="Enter your password" {...field}
                type = "password" 
                className='border-black' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                placeholder="Confirm your password" {...field}
                type = "password" 
                className='border-black' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='container flex items-center justify-around gap-5 md:gap-1'>
          <Button className="text-bodyColor" type="submit">Login</Button>
          <Button className="text-bodyColor"><Link to='/register'>Not Registered? Sign Up</Link></Button>
        </div>
      </form>
    </Form>
    </div>
    </>
  )
}

export default Login
