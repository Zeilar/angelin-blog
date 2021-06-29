import express from "express";
import { authenticate, register, logout, login } from "../controllers/usersController";
import { AuthGuard } from "../middlewares";

export const router = express.Router();

router.get("/authenticate", AuthGuard.user, authenticate);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
