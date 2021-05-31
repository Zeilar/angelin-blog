import { User } from "../../db/models/User";

export function sanitizeUser(user: User): User {
	delete user.password;
	return user;
}
