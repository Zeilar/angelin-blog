import express from "express";
import { CommentsController } from "../controllers";
import * as middlewares from "../middlewares";

export const router = express.Router();

router.post("", CommentsController.create);
router.put(
	"/:id",
	[middlewares.getCommentOrFail, middlewares.CommentGuard.edit],
	CommentsController.edit
);
router.delete(
	"/:id",
	[middlewares.getCommentOrFail, middlewares.CommentGuard.delete],
	CommentsController.delete
);
