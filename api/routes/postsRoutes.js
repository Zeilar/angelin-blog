const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const { loggedIn } = require("../middlewares/auth");

router.get("", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("", loggedIn, postsController.createPost);
router.put("/:id", loggedIn, postsController.editPost);
router.delete("/:id", loggedIn, postsController.deletePost);

module.exports = router;
