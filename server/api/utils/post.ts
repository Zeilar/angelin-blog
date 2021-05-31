import { Post } from "../../db/models/Post";
import errorlog from "../../utils/errorlog";

export function sanitizePost(post: Post): Post {
	try {
		delete post.author.password;
		return post;
	} catch (error) {
		errorlog(error);
		return post;
	}
}
