import { User as UserModel, Tag, Comment, Post } from "../db/models";

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			SESSION_SECRET: string;
			ENV: "local" | "production";
			DB_NAME: string;
			DB_USER: string;
			DB_PASSWORD: string;
			DB_CLIENT: string;
			GITHUB_CLIENT: string;
			GITHUB_SECRET: string;
			[key: string]: string;
		}
	}

	namespace Express {
		interface User extends UserModel {}

		interface Response {
			user?: UserModel;
			users?: UserModel[];
			post?: Post;
			posts?: Post[];
			comments?: Comment[];
			comment?: Comment;
			tags?: Tag[];
			tag?: Tag;
		}
	}
}
