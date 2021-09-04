export class HTTPError extends Error {
	constructor(public readonly message: string, public readonly code: number = 500) {
		super();
	}
}
