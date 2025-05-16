import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conncected');
    }catch (error){
        console.error(error);
        process.exit(1);
    }
};