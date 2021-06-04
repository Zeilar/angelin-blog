import { Comment } from "../../db/models";
import errorlog from "../../utils/errorlog";

export function sanitizeComment(comment: Comment): Comment {
	try {
		delete comment.author.password;
		comment.author.is_admin = Boolean(comment.author.is_admin);
	} catch (error) {
		errorlog(error);
	} finally {
		return comment;
	}
}
