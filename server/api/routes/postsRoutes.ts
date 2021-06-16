import express from "express";
import * as Controller from "../controllers/postsController";
import { loggedIn } from "../middlewares/auth";
import * as Access from "../middlewares/post/access";
import { getPostOrFail } from "../middlewares/post";

export const router = express.Router();

router.get("", getPostOrFail, Controller.getAllPosts);
router.get("/:id", getPostOrFail, Controller.getPostById);
router.post("", loggedIn, Access.canCreatePost, Controller.createPost);
router.put("/:id", loggedIn, getPostOrFail, Access.canEditPost, Controller.editPost);
router.delete("/:id", loggedIn, getPostOrFail, Access.canDeletePost, Controller.deletePost);
