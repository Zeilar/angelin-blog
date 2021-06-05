export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Args {
	url: string;
	method?: Method;
	body?: any;
	withResponse?: boolean;
}

export interface UserCredentials {
	email: string;
	password: string;
}
