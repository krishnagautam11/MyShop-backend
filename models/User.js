import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, requried: true, unique:true},
    password: {type: String, required:true}
});

export const User = mongoose.model('User', userSchema);