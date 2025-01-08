import mongoose from "mongoose";
import dotenv from "dotenv"
const connectDB = async(): Promise<void>=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDb Connected:${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;