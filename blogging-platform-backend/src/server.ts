import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database";
import {errorHandler} from  "./middleware/errorMiddleware"
dotenv.config()
connectDB()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(errorHandler)

app.get('/',(req,res)=>{
    res.send('API IS RUNNING'
    
    )
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})