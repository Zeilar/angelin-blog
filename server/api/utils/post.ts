import { Post } from "../../db/models";
import errorlog from "../../utils/errorlog";

export function sanitizePost(post: Post): Post {
	try {
		delete post.author.password;
		post.author.is_admin = Boolean(post.author.is_admin);
		return post;
	} catch (error) {
		errorlog(error);
		return post;
	}
}
