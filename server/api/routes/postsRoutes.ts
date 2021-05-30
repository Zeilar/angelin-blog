import { loggedIn } from "../middlewares/auth";
import express from "express";
import {
	getAllPosts,
	getPostById,
	createPost,
	editPost,
	deletePost,
} from "../controllers/postsController";

const router = express.Router();

router.get("", getAllPosts);
router.get("/:id", getPostById);
router.post("", loggedIn, createPost);
router.put("/:id", loggedIn, editPost);
router.delete("/:id", loggedIn, deletePost);

export default router;
