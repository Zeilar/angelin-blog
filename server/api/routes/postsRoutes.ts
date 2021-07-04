import { Router } from "express";
import * as middlewares from "../middlewares";
import { Container } from "typedi";
import { PostsController } from "../controllers";

const postsController = Container.get(PostsController);
const { errorWrapper } = postsController;

export const router = Router();

router.get(
	"",
	[middlewares.getPostOrFail, middlewares.filterPosts],
	errorWrapper(postsController.index)
);
router.get("/:id", [middlewares.getPostOrFail], errorWrapper(postsController.single));
router.post(
	"",
	[middlewares.AuthGuard.user, middlewares.AuthGuard.admin, middlewares.PostGuard.create],
	errorWrapper(postsController.create)
);
router.put(
	"/:id",
	[
		middlewares.AuthGuard.user,
		middlewares.AuthGuard.admin,
		middlewares.getPostOrFail,
		middlewares.PostGuard.edit,
	],
	errorWrapper(postsController.edit)
);
router.delete(
	"/:id",
	[
		middlewares.AuthGuard.user,
		middlewares.AuthGuard.admin,
		middlewares.getPostOrFail,
		middlewares.PostGuard.delete,
	],
	errorWrapper(postsController.delete)
);
