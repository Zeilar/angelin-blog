import { Comment, Post, Tag, User } from "../server/db/models";

export {};

declare global {
	namespace Express {
		interface Response {
			user?: User;
			users?: User[];
			post?: Post;
			posts?: Post[];
			comments?: Comment[];
			comment?: Comment;
			tags?: Tag[];
			tag?: Tag;
		}
	}
}
