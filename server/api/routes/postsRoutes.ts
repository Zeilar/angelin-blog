import express from "express";
import { PostsController } from "../controllers";
import * as middlewares from "../middlewares";

export const router = express.Router();

router.get("", [middlewares.getPostOrFail, middlewares.filterPosts], PostsController.index);
router.get("/:id", [middlewares.getPostOrFail], PostsController.single);
router.post(
	"",
	[middlewares.AuthGuard.user, middlewares.AuthGuard.admin, middlewares.PostGuard.create],
	PostsController.create
);
router.put(
	"/:id",
	[
		middlewares.AuthGuard.user,
		middlewares.AuthGuard.admin,
		middlewares.getPostOrFail,
		middlewares.PostGuard.edit,
	],
	PostsController.edit
);
router.delete(
	"/:id",
	[
		middlewares.AuthGuard.user,
		middlewares.AuthGuard.admin,
		middlewares.getPostOrFail,
		middlewares.PostGuard.delete,
	],
	PostsController.delete
);
