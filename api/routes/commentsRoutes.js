const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.post("", commentsController.createComment);
router.put("/:id", commentsController.editComment);
router.delete("/:id", commentsController.deleteComment);

module.exports = router;
