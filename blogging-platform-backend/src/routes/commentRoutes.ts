import express from "express"
import {
    addComment,
    getCommentsForBlog,
} from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/",authMiddleware,addComment);

router.get("/:blogId",getCommentsForBlog);
export default router;