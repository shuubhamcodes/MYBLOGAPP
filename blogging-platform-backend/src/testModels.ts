import mongoose from "mongoose";
import User from "./models/User";
import Blog from "./models/Resource";
import connectDB from "./config/database";
import dotenv from "dotenv"
dotenv.config();

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create a new user
    const user = await User.create({
      username: "john_doe",
      email: "john@example.com",
      password: "password123",
    });
    console.log("User created:", user);

    // Create a new blog post
    const blog = await Blog.create({
      title: "My First Blog",
      content: "This is the content of my first blog post.",
      author: user._id,
    });
    console.log("Blog created:", blog);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
})();
