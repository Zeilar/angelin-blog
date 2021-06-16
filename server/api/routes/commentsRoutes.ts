import express from "express";
import { createComment, editComment, deleteComment } from "../controllers/commentsController";
import { getCommentOrFail, canEditComment } from "../middlewares/comment";

export const router = express.Router();

router.post("", createComment);
router.put("/:id", getCommentOrFail, canEditComment, editComment);
router.delete("/:id", getCommentOrFail, deleteComment);
