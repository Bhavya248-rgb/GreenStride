import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async() =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}`);
        console.log(`Database name : ${connect.connection.name}`);
    }
    catch(error){
        console.log("Error connecting database :",error);
        process.exit(1);
    }
};
export default connectDB;