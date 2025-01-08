import {Request,Response} from "express";
import {z} from "zod";
import Blog from "../models/Resource";


const createBlogSchema = z.object({
    title:z.string().min(1,"Title is required"),
    content: z.string().min(1,"Content is required")
})

export const createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content } = createBlogSchema.parse(req.body);
  
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
  
      const blog = await Blog.create({ title, content, author: userId });
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors });
        return;
      }
      res.status(500).json({ error: "Server Error" });
    }
  };


    export const getBlogs= async(req: Request, res:Response)=>{
        try{
            const blogs = await Blog.find().populate("author","username email");
            res.status(200).json(blogs)
        }catch(err){
            res.status(500).json({ error: "Server Error" });
        }
    }

    export const getBlogById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
      
          // Fetch the blog and populate the author's username and email
          const blog = await Blog.findById(id).populate("author", "username email");
      
          if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
          }
      
          res.status(200).json(blog);
        } catch (err) {
          res.status(500).json({ error: "Server Error" });
        }
      };
      
      // Update a Blog
      export const updateBlog = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
      
          // Validate the incoming data using Zod
          const { title, content } = createBlogSchema.parse(req.body);
      
          // Find the blog by ID
          const blog = await Blog.findById(id);
      
          if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
          }
      
          // Check if the logged-in user is the author of the blog
          if (blog.author.toString() !== req.user?.id) {
            res.status(403).json({ error: "Unauthorized to update this blog" });
            return;
          }
      
          // Update the blog
          blog.title = title;
          blog.content = content;
          await blog.save();
      
          res.status(200).json({ message: "Blog updated successfully", blog });
        } catch (err: any) {
          if (err instanceof z.ZodError) {
            res.status(400).json({ error: err.errors });
            return;
          }
          res.status(500).json({ error: "Server Error" });
        }
      };
      
      // Delete a Blog
      export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
      
          // Find the blog by ID
          const blog = await Blog.findById(id);
      
          if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
          }
      
          // Check if the logged-in user is the author of the blog
          if (blog.author.toString() !== req.user?.id) {
            res.status(403).json({ error: "Unauthorized to delete this blog" });
            return;
          }
      
          // Delete the blog
          await blog.deleteOne();
      
          res.status(200).json({ message: "Blog deleted successfully" });
        } catch (err) {
          res.status(500).json({ error: "Server Error" });
        }
      };