import express from "express";
import { createComment, editComment, deleteComment } from "../controllers/commentsController";
import { getCommentOrFail } from "../middlewares/comment/request";

const router = express.Router();

router.post("", createComment);
router.put("/:id", getCommentOrFail, editComment);
router.delete("/:id", getCommentOrFail, deleteComment);

export default router;
