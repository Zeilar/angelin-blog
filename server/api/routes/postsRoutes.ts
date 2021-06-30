import express from "express";
import { PostsController } from "../controllers";
import * as Middlewares from "../middlewares";

export const router = express.Router();

router.get("", [Middlewares.getPostOrFail, Middlewares.filterPosts], PostsController.index);
router.get("/:id", [Middlewares.getPostOrFail], PostsController.single);
router.post(
	"",
	[Middlewares.AuthGuard.user, Middlewares.AuthGuard.admin, Middlewares.PostGuard.create],
	PostsController.create
);
router.put(
	"/:id",
	[
		Middlewares.AuthGuard.user,
		Middlewares.AuthGuard.admin,
		Middlewares.getPostOrFail,
		Middlewares.PostGuard.edit,
	],
	PostsController.edit
);
router.delete(
	"/:id",
	[
		Middlewares.AuthGuard.user,
		Middlewares.AuthGuard.admin,
		Middlewares.getPostOrFail,
		Middlewares.PostGuard.delete,
	],
	PostsController.delete
);
