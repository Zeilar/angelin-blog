import { Post, User } from "../server/db/models";

export {};

declare global {
	namespace Express {
		interface Response {
			user?: User;
			post?: Post;
			posts?: Post[];
		}
	}
}
