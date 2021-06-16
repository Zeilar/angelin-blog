import { User } from "../../db/models";

export function sanitizeUser(user: User) {
	delete user.password;
	user.is_admin = Boolean(user.is_admin);
	return user;
}
