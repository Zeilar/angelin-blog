import { User } from "../../db/models/User";

export function sanitizeUser(user: User) {
	user.password = undefined;
	return user;
}
