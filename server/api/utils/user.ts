import { User } from "../../db/models";

/**
 * @description Removes sensitive information and converts is_admin from boolean to integer
 */
export function sanitizeUser(user: User) {
	delete user.password;
	user.is_admin = Boolean(user.is_admin);
	return user;
}
