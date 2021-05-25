const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// router.get("/authenticate", postsController.authenticate);
router.post("", postsController.create);

module.exports = router;
