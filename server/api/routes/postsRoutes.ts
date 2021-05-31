import { loggedIn } from "../middlewares/auth";
import { getPostOrFail } from "../middlewares/post/request";
import express from "express";
import {
	getAllPosts,
	getPostById,
	createPost,
	editPost,
	deletePost,
} from "../controllers/postsController";

const router = express.Router();

router.get("", getPostOrFail, getAllPosts);
router.get("/:id", getPostOrFail, getPostById);
router.post("", loggedIn, createPost);
router.put("/:id", loggedIn, getPostOrFail, editPost);
router.delete("/:id", loggedIn, getPostOrFail, deletePost);

export default router;
