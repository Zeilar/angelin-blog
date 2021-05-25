const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("", postsController.getAllPosts);
router.get("/user/:id", postsController.getPostsFromUserId);
router.post("", postsController.create);

module.exports = router;
