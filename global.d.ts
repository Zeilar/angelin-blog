import { User } from "./server/db/models/User";
import { ENV } from "./types/env";

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

	namespace NodeJS {
		interface ProcessEnv extends ENV {}
	}
}
