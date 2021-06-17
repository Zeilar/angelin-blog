import { Post } from "../../db/models";
import errorlog from "../../utils/errorlog";

export enum PostValidation {
	MAX_LENGTH = 500,
}

/**
 * @description Removes sensitive information and converts is_admin from boolean to integer
 */
export function sanitizePost(post: Post) {
	delete post.author.password;
	post.author.is_admin = Boolean(post.author.is_admin);
	return post;
}
