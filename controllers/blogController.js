const mongoose  = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user');
    if(!blogs){
      return res.status(200).send({
        success: false,
        message: 'No blogs found'
      })
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: 'Blogs fetched successfully',
      blogs
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:'Error while getting blogs',
      error
    })
  }
};

//Crete blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findById(user);

    // Validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    
    // Using transactions for atomicity
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await newBlog.save({ session });
      existingUser.blogs.push(newBlog);
      await existingUser.save({ session });
      await session.commitTransaction();

      return res.status(201).send({
        success: true,
        message: 'Blog Created!',
        newBlog,
      });
    } catch (error) {
      // If an error occurs during the transaction, abort it
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session after the transaction
      session.endSession();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error while creating blog',
      error: error.message,
    });
  }
};

//update-blog
exports.updateBlogController = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, description, image} = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      {...req.body},
      {new:true}
       );
    return res.status(200).send({
      success: true,
      message: 'Blog Updated!',
      blog
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Failed to update the Blog",
      error
    })
  }
};

//get single blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if(!blog){
      return res.status(404).send({
        success: false,
        message: 'blog not found'
      })
    }
    return res.status(200).send({
      success: true,
      message: 'Single blog fetched successfully',
      blog
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error while getting single blog',
      error
    })
  }
};

//delete blog
exports.deleteBlogController = async (req, res) => {
  console.log(req.params.id);
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
    console.log(blog);
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error while deleting blog',
      error
    })
  }
};

//get user blog
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs');
    if(!userBlog){
      return res.status(404).send({
        success: false,
        message:'Blogs not found with this id'
      })
    }
    return res.status(200).send({
      success: true,
      message: 'User blogs',
      userBlog
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'error in user blog',
      error
    })
  }
}