import { User } from "../../db/models";

export function sanitizeUser(user: User): User {
	delete user.password;
	return user;
}
