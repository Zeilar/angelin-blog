import express from "express";
import * as Controller from "../controllers/postsController";
import * as Middleware from "../middlewares";

export const router = express.Router();

router.get("", Middleware.getPostOrFail, Controller.getAllPosts);
router.get("/:id", Middleware.getPostOrFail, Controller.getPostById);
router.post(
	"",
	Middleware.loggedIn,
	Middleware.admin,
	Middleware.canCreatePost,
	Controller.createPost
);
router.put(
	"/:id",
	Middleware.loggedIn,
	Middleware.admin,
	Middleware.getPostOrFail,
	Middleware.canEditPost,
	Controller.editPost
);
router.delete(
	"/:id",
	Middleware.loggedIn,
	Middleware.admin,
	Middleware.getPostOrFail,
	Middleware.canDeletePost,
	Controller.deletePost
);
