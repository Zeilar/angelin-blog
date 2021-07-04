import { Router } from "express";
import { Container } from "typedi";
import { UsersController } from "../controllers";
import { AuthGuard, getUserOrFail } from "../middlewares";
import { UserGuard } from "../middlewares/user/UserGuard";

export const router = Router();

const usersController = Container.get(UsersController);
const { errorWrapper } = usersController;

router.get("/authenticate", [AuthGuard.user], errorWrapper(usersController.authenticate));
router.post("/register", errorWrapper(usersController.register));
router.post("/login", errorWrapper(usersController.login));
router.get("/logout", errorWrapper(usersController.logout));
router.put(
	"/:id",
	[AuthGuard.user, getUserOrFail, UserGuard.edit],
	errorWrapper(usersController.update)
);
