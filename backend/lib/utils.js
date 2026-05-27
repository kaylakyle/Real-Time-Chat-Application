import jwt from "jsonwebtoken"
//generate a jwt token
export const generateToken = (userId, res) => {

     const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"

   })

   //send cookie after generating token
   res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,//prevents XSS attacks
    sameSite: "strict",// prevent csrf attacks
    secure: process.env.NODE_ENV === "development"
   })

   return token;

}