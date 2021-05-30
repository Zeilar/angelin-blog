import express from "express";
import { createComment, editComment, deleteComment } from "../controllers/commentsController";

const router = express.Router();

router.post("", createComment);
router.put("/:id", editComment);
router.delete("/:id", deleteComment);

export default router;
