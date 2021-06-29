import express from "express";
import { createComment, editComment, deleteComment } from "../controllers/commentsController";
import { getCommentOrFail, CommentGuard } from "../middlewares/comment";

export const router = express.Router();

router.post("", createComment);
router.put("/:id", getCommentOrFail, CommentGuard.edit, editComment);
router.delete("/:id", getCommentOrFail, deleteComment);
