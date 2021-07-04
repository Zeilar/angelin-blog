import { Router } from "express";
import { compositeRoot } from "../../CompositeRoot";
import * as middlewares from "../middlewares";

const { commentsController } = compositeRoot;
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
