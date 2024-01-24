const express = require('express');
const { 
  getAllBlogsController, 
  getBlogByIdController, 
  createBlogController, 
  updateBlogController, 
  deleteBlogController, 
  userBlogController
} = require('../controllers/blogController');

//router object
const router = express.Router()

//routes

//get-all blogs
router.get('/all-blog', getAllBlogsController);

//get-single-blog
router.get('/get-blog/:id', getBlogByIdController);

//create-blog
router.post('/create-blog', createBlogController);

//update-blog
router.put('/update-blog/:id', updateBlogController);

//delete-blog
router.delete('/delete-blog/:id', deleteBlogController);

//get user blog
router.get('/user-blog/:id', userBlogController)

module.exports = router;