import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js"
import bcrypt from "bcryptjs";

//function save user to the db,hashing password,generate jwt token and send cookies
export const signup =  (req, res) => {
  const { email, password, fullName } = req.body;
      
  try {
     
     // check all input fields
        if(!email || !password || !fullName) {
            return res.status(400).json ({message: "All fields are required"});
        }
    
    //password length
        if (password.length < 6) {
            return res.status(400).json ({message: "Password must be at least 6 characters"})
        }

        // check if user email already exits
   const user = await User.findOne({email});

   if (user) {
    return res.status(400).json ({message: "Email already exists, please use a diffrent email"});
   }

   // hash password
   const salt = await bcrypt.genSalt(10);//created the salt

     const hashedPassword = await bcrypt.hash(password, salt);//hashed the password

     const newUser = await User({
    email,
    fullName,
    password:hashedPassword
});

// check if their is a user
if(newUser) {
//if their is a user generate a jwt token here
  generateToken(newUser._id,res)
  //save new user to the database
  await newUser.save();

  res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    profilePic : newUser.profilePic,
  })
}else {
   return res.status(400).json ({message: "Invalid user data"})
}


  }catch (error) {
       console.log("Error in SignUp Controller", error.message);
       res.status(500).json({message:"Internal Server Error"}); 
  }
}; 

export const login =  (req, res) => {
   //for user to login they need email and password 
        const {email, password} = req.body;
   try{

        if (!email || !password) {
            return res.status(400).json ({message: "All fields are required"});
        }

        //check if user is in the database(email,password)
         const user = await User.findOne({email});
          if (!user) return res.status(401).json({ message:"Invalid Credentials"});

          //if user is their check if password is correct
         const isPasswordCorrect = await bcrypt.compare(password, user.password)

         //if password is wrong
         if(!isPasswordCorrect) {
          return res.status(401).json({ message:"Invalid Credentials"});
          // if correct generate token
          generateToken(user._id,res)

           res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic : user.profilePic,
           })
         }
   }catch (error) {
        console.log("Error in login Controller", error.message);
       res.status(500).json({message:"Internal Server Error"}); 
   }
}; 

export const logout =  (req, res) => {
   //for logout just clear the user cookies
   try {
     res.clearCookie("jwt", "", {maxAge:0} )
     res.status(200).json({success:true, message:"Logout Successfully"});
   }catch (error){
    console.log("Error in logout Controller", error.message);
       res.status(500).json({message:"Internal Server Error"});
   }
} 

export const updateProfile = (req, res) => {
  
}