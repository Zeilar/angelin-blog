export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT?: string;
			SESSION_SECRET?: string;
			DB_NAME?: string;
			DB_USER?: string;
			DB_PASSWORD?: string;
			DB_CLIENT?: string;
		}
	}
}
