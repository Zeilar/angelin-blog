import { Comment } from "../../db/models";
import errorlog from "../../utils/errorlog";

export function sanitizeComment(comment: Comment): Comment {
	try {
		delete comment.author.password;
		return comment;
	} catch (error) {
		errorlog(error);
		return comment;
	}
}
