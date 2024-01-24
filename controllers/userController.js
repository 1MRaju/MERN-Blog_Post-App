const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');


//create user register user
exports.registerController = async (req, res) => {
  try {
    const {username,email,password} = req.body;
    
    //validation
    if(!username || !email || !password){
      return res.status(400).send({
        success: false,
        message:'Please fill all fields'
      })
    }

    //hash password
    const hashedPass = await bcrypt.hash(password, 8);
    // password = hashedPass;

    //existinf user
    const existingUser = await userModel.findOne({email})
    if(existingUser){
      return res.status(401).send({
        success:false,
        message:'user already exitsts',
      })
    }

    //savenew user
    const user = new userModel({username, email, password:hashedPass});
    await user.save();
    return res.status(201).send({
       success: true,
       message:'New user created',
       user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:'Error While User Registration',
      success: false,
      error
    })
  }
};


//get all users
exports.getAllUsers = async (req, res) => {
  try {
      const users = await userModel.find({});
      return res.status(200).send({
        success:true,
        userCount: users.length,
        message: 'all users data',
        users
      })
  } catch (error) {
    console.log(error);
    return res.status(500),send({
      success: false,
      message: "Error while getting all users",
      error
    })
  }
};


//login
exports.loginController = async (req, res) => {
  try {
    const {email, password} = req.body;

    //validation
    if(!email || !password) {
      return  res.status(401).send({
        success: false,
        message:'Please provide email or password'
      })
    }
    //checking the user existance in db
    const user =  await userModel.findOne({email});
    if(!user){
      return res.status(200).send({
        success: false,
        message:'email is not registered'
      })
    }

    //password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).send({
        success:false,
        messsage:"Invalid username or password"
      })
    }
    return res.status(200).send({
      success: true,
      message: 'Login successful',
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success:false,
      message:"Error while user login",
      error
    })
    
  }
};