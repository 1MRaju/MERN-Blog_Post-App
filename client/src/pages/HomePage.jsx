import React from 'react'

const HomePage = () => {
  return (
    <div className='text-center h-screen flex flex-col items-center justify-center gap-5'>
    <h1 className='text-3xl md:text-5xl h-1/8 md:h-1/4 tracking-tighter font-bold'>
      Welcome to Your Blog Haven
    </h1>
    <div className='container flex flex-col justify-around h-3/5 bg-homeColor text-bodyColor tracking-wider p-4 md:p-8'>
      <h3 className='text-xl md:text-3xl'>
        Hello Bloggers and Wordsmiths
      </h3>
      <p className='text-sm md:text-lg'>
        Step into a world of creativity, expression, and a tapestry of ideas welcome to Your Blog Haven!
      </p>
  
      <p className='text-sm md:text-lg'>
        Here, your thoughts take center stage, your words find a home, and your stories come to life. Whether you're a seasoned writer or a newcomer to the world of blogging, we're thrilled to have you here.
      </p>
  
      <p className='text-sm md:text-lg'>
        Ready to embark on this exciting journey? Dive into the world of words, create your blog, and let the magic begin.
      </p>
  
      <p className='text-md md:text-xl'>
        Happy blogging!
      </p>
    </div>
  </div>
  
  )
}

export default HomePage