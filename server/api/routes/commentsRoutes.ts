import { Router } from "express";
import { Container } from "typedi";
import { CommentsController } from "../controllers";
import * as middlewares from "../middlewares";

const commentsController = Container.get(CommentsController);
const { errorWrapper } = commentsController;

export const router = Router();

router.post("", errorWrapper(commentsController.create));
router.put(
	"/:id",
	[middlewares.getCommentOrFail, middlewares.CommentGuard.edit],
	errorWrapper(commentsController.edit)
);
router.delete(
	"/:id",
	[middlewares.getCommentOrFail, middlewares.CommentGuard.delete],
	errorWrapper(commentsController.delete)
);
