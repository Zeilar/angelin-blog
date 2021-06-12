export as namespace Query;

export interface Args {
	url: string;
	method?: Method;
	body?: any;
	headers?: Headers;
	params?: QueryParams;
	withResponse?: boolean;
}

export interface Response<T> {
	data?: T;
	error?: string;
}

export interface QueryParams {
	[key: string]: string;
}

export type Status = "loading" | "success" | "error";

export type Headers = {
	"Content-Type"?: MimeTypes;
	Accept?: MimeTypes | "/";
};

export interface Options extends HeadersInit, Args {
	signal: AbortSignal;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type MimeTypes =
	| "application/json"
	| "application/xhtml+xml"
	| "text/html"
	| "multipart/formdata"
	| "image/gif"
	| "image/jpeg"
	| "image/png"
	| "image/svg+xml"
	| "image/webp"
	| "image/*"
	| "audio/mpeg"
	| "audio/x-wav";

export interface UserCredentials {
	email: string;
	password: string;
}
