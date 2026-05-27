// creating the user model schema
import mongoose from 'mongoose';

//creating a user schema

const userSchema = new mongoose.Schema({
    //login page info
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: '',
    },
    }, { timestamps: true });

    //create a model from user/schema
    const User = mongoose.model('User', userSchema);
    export default User;