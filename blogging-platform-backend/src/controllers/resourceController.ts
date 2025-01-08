import {Request,Response} from "express";
import {z} from "zod";
import Blog from "../models/Resource";


const createBlogSchema = z.object({
    title:z.string().min(1,"Title is required"),
    content: z.string().min(1,"Content is required")
})

export const createBlog = async(req: Request, res: Response)=>{
    try{
        const{title,content} = createBlogSchema.parse(req.body)

        const userId = req.user?.id;
        if(!userId){
            return res.status(401).json({error:"unauthorized"})
        }
        const blog= await Blog.create({title,content,author: userId})
        res.status(201).json({ message: "Blog created successfully", blog });
    }catch(err:any){
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
          }
          res.status(500).json({ error: "Server Error" });
        }
    }


    export const getBlogs= async(req: Request, res:Response)=>{
        try{
            const blogs = await Blog.find().populate("author","username email");
            res.status(200).json(blogs)
        }catch(err){
            res.status(500).json({ error: "Server Error" });
        }
    }

    export const getBlogById = async(req:Request,res:Response)=>{
        try{
            const{id} =req.params;
            const blog = await Blog.findById(id).populate("author","username email");
            if(!blog){
                return res.status(404).json({error:"blog not found"})
            }
            res.status(200).json(blog);
        }catch(err){
            res.status(500).json({ error: "Server Error" });
        }

    }