import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Zod schemas for request validation
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body with Zod
    const { username, email, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ username, email, password: hashedPassword });

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    // Send success response
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err: any) {
    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }

    // Pass other errors to the error middleware
    next(err);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body with Zod
    const { email, password } = loginSchema.parse(req.body);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    // Send success response
    res.status(200).json({ message: "Login successful", token });
  } catch (err: any) {
    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }

    // Pass other errors to the error middleware
    next(err);
  }
};
