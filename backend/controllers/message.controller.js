import cloudinary from "../lib/claudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
      //fetch every user but not ourself those who logged in
      const loggedInUserId =req.user._id;
      const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");

      res.status(200).json(filteredUsers);
    }catch (error) {
      console.log("Error in getUsersForSidebar controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    })
}
};

export const getMessages = async (req, res) => {
    try {
       const {id: userToChatId } = req.params;
       const myId = req.user._id;

       const messages = await MessageChannel.find({
        $or: [
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myId},
        ],
       });
    }catch (error){
    console.log("Error in getMessages controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
    }
};

export const sendMessages = async (req,res) => {
    try {
       const {text, image } = req.body;
       const {id: receiverId } = req.params;
       const senderId = req.user._id;

       let imageUrl;
       if (image) {
        //upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl =uploadResponse.secure_url;

        //create new message

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
       }

       //save 
       await newMessage.save();

       // will do realtime functionality here later 

       res.status(201).json(newMessage)
    }catch (error){
       console.log("Error in sendMessages controller", error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
    }
}