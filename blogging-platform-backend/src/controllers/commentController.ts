import { Request, Response } from "express";
import { z } from "zod";
import Comment from "../models/Comments";
import Blog from "../models/Resource";

// Zod schema for adding a comment
const commentSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const addComment = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { content } = commentSchema.parse(req.body);

    // Check if the blog exists
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Add the comment
    const userId = req.user?.id; // Ensure the user is authenticated
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const comment = await Comment.create({
      content,
      author: userId,
      blog: blogId,
    });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: "Server error" });
  }
};

export const getCommentsByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    // Check if the blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Fetch comments for the blog
    const comments = await Comment.find({ blog: blogId }).populate(
      "author",
      "username email"
    );

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
