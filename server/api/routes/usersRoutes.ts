import express from "express";
import { UsersController } from "../controllers/UsersController";
import { AuthGuard } from "../middlewares";

export const router = express.Router();

router.get("/authenticate", AuthGuard.user, UsersController.authenticate);
router.post("/register", UsersController.register);
router.post("/login", UsersController.login);
router.get("/logout", UsersController.logout);
