import { Router } from "express";
import { compositeRoot } from "../../CompositeRoot";
import { AuthGuard } from "../middlewares";

export const router = Router();

const { usersController } = compositeRoot;
const { errorWrapper } = usersController;

router.get("/authenticate", [AuthGuard.user], errorWrapper(usersController.authenticate));
router.post("/register", errorWrapper(usersController.register));
router.post("/login", errorWrapper(usersController.login));
router.get("/logout", errorWrapper(usersController.logout));
