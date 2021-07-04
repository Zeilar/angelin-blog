import { UsersController, PostsController, CommentsController } from "./api/controllers";
import { UserRepository } from "./repositories";
import { AuthService, ValidateService } from "./services";

function createCompositeRoot() {
	const usersController = new UsersController(
		new AuthService(new UserRepository()),
		new ValidateService()
	);

	const postsController = new PostsController(new ValidateService());
	const commentsController = new CommentsController(new ValidateService());

	return { usersController, postsController, commentsController };
}

export const compositeRoot = createCompositeRoot();
