import { User } from "./server/db/models/User";

export {};

declare global {
	namespace Express {
		interface Session {
			user?: number;
		}

		interface Response {
			user?: User;
		}

		interface Request {
			session: Session;
		}
	}
}
