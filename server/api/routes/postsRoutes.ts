import express from "express";
import * as Controller from "../controllers/postsController";
import * as Middlewares from "../middlewares";

export const router = express.Router();

router.get("", Middlewares.getPostOrFail, Middlewares.filterPosts, Controller.getAllPosts);
router.get("/:id", Middlewares.getPostOrFail, Controller.getPostById);
router.post(
	"",
	Middlewares.AuthGuard.user,
	Middlewares.AuthGuard.admin,
	Middlewares.PostGuard.create,
	Controller.createPost
);
router.put(
	"/:id",
	Middlewares.AuthGuard.user,
	Middlewares.AuthGuard.admin,
	Middlewares.getPostOrFail,
	Middlewares.PostGuard.edit,
	Controller.editPost
);
router.delete(
	"/:id",
	Middlewares.AuthGuard.user,
	Middlewares.AuthGuard.admin,
	Middlewares.getPostOrFail,
	Middlewares.PostGuard.delete,
	Controller.deletePost
);
