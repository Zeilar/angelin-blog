import express from "express";
import * as Controller from "../controllers/postsController";
import * as Middlewares from "../middlewares";

export const router = express.Router();

router.get("", Middlewares.getPostOrFail, Middlewares.filterPosts, Controller.getAllPosts);
router.get("/:id", Middlewares.getPostOrFail, Controller.getPostById);
router.post(
	"",
	Middlewares.loggedIn,
	Middlewares.admin,
	Middlewares.canCreatePost,
	Controller.createPost
);
router.put(
	"/:id",
	Middlewares.loggedIn,
	Middlewares.admin,
	Middlewares.getPostOrFail,
	Middlewares.canEditPost,
	Controller.editPost
);
router.delete(
	"/:id",
	Middlewares.loggedIn,
	Middlewares.admin,
	Middlewares.getPostOrFail,
	Middlewares.canDeletePost,
	Controller.deletePost
);
