import express from "express";
import { createComment, editComment, deleteComment } from "../controllers/commentsController";
import { loggedIn } from "../middlewares/auth";
import { canEditComment } from "../middlewares/comment/canEditComment";
import { getCommentOrFail } from "../middlewares/comment/request";

const router = express.Router();

router.post("", loggedIn, createComment);
router.put("/:id", loggedIn, getCommentOrFail, canEditComment, editComment);
router.delete("/:id", loggedIn, getCommentOrFail, deleteComment);

export default router;
