import { Post } from "../server/db/models/Post";
import { User } from "../server/db/models/User";

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
