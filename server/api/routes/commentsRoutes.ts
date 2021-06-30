import express from "express";
import { CommentsController } from "../controllers";
import * as Middlewares from "../middlewares";

export const router = express.Router();

router.post("", CommentsController.create);
router.put(
	"/:id",
	[Middlewares.getCommentOrFail, Middlewares.CommentGuard.edit],
	CommentsController.edit
);
router.delete(
	"/:id",
	[Middlewares.getCommentOrFail, Middlewares.CommentGuard.delete],
	CommentsController.delete
);
