import { Router } from "express";
import { router as githubOauth } from "./githubOauth";

export const router = Router();

router.use("/github", githubOauth);
