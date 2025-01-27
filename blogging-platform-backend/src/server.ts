import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database";
import {errorHandler} from  "./middleware/errorMiddleware"
import authRoutes from "./routes/authRoutes"
import resourceRoutes from "./routes/resourceRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config()
connectDB()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON


app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/blogs", resourceRoutes); // Blog routes
app.use("/api/comments", commentRoutes); // Comment routes
app.use(errorHandler)

app.get('/',(req,res)=>{
    res.send('API IS RUNNING'
    
    )
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})