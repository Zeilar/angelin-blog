export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_GITHUB_LOGIN_URI: string;
			REACT_APP_SERVER_URL: string;
			[key: string]: string;
		}
	}
}
