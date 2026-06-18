import cloudinary from "../lib/claudinary.js";
import { generateToken } from "../lib/utils.js";//
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";//import bcrypt

// SIGNUP
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    // check all input fields
    if (!email || !password || !fullName) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    // password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists, please use a different email",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    // save user
    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);

      // save to database
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check inputs
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // generate token
    generateToken(user._id, res);

    // send response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {

    const {profilePic} = req.body;
    const userId = req.user._id;
  
    //if no profilepic
     if (!profilePic) {
      return res.status(401).json({
        message: "profilePic is required",
      });
    }

    //if their is upload it to cloaudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    //save to the database
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})

    res.status(200).json(updatedUser)


  } catch (error) {
    console.log("Error in updateProfile controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
   try {
      res.status(200).json(req.user);
   }catch (error) {
     console.log("Error in checkAuth controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    }); 
   }
};
