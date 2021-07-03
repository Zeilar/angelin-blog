import { UsersController, PostsController, CommentsController } from "./api/controllers";
import { UserRepository } from "./repositories";
import { AuthService } from "./services";

function createCompositeRoot() {
	const usersController = new UsersController(new AuthService(new UserRepository()));

	return { usersController };
}

export const compositeRoot = createCompositeRoot();
