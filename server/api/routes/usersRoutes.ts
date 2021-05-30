import express from "express";
import { authenticate, register, logout, login } from "../controllers/usersController";
import { loggedIn } from "../middlewares/auth";

const router = express.Router();

router.get("/authenticate", loggedIn, authenticate);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
