import { Comment } from "../../db/models";
import errorlog from "../../utils/errorlog";

/**
 * @description Removes sensitive information and converts is_admin from boolean to integer
 */
export function sanitizeComment(comment: Comment) {
	try {
		delete comment.author.password;
		comment.author.is_admin = Boolean(comment.author.is_admin);
	} catch (error) {
		errorlog(error);
	} finally {
		return comment;
	}
}
