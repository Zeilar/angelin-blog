import session from "express";
import { Comment, Post, Tag, User } from "../../db/models";

declare module "express" {
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
