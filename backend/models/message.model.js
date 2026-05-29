// creating the user model schema
import mongoose from 'mongoose';

//creating a user schema

const messageSchema = new mongoose.Schema({
    //login page info
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
    },
    text: {
        type: String,
        
    },
   image: {
        type: String,
    },
    }, { timestamps: true });

    //create a model from user/schema
    const Message = mongoose.model('Message', messageSchema);
    export default Message;