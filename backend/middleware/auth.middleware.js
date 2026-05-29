import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
     //check for token first
      const token = req.cookies.jwt;

        // check for token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        
        // if token decode it and grab user id
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        //if correct find user in the db
         const user = await User.findById(decoded.userId).select("-password");

         // if no user found send error 404
         if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        // add the user to the request and the db
          req.user = user;
           next();// calls the next function 
    }catch (error) {
    console.log("Error in protectRoute middleware:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

//visit claudinary.com   login visit the dashboard copy cloud name
//.env CLOUDINAR_CLOUD_NAME=PASTE]
//CLOUDINARY_API_KEY=
//CLOUDINARY_API_SECRET= TO GET THEM GO TO SETTINGS API KEY CREATE NEW API KEY