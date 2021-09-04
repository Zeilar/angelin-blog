import { ErrorMessages } from "../api/utils";

export class HTTPError extends Error {
	constructor(
		public readonly message: string = ErrorMessages.DEFAULT,
		public readonly code: number = 500,
		public readonly advancedResponse?: Record<string, any>
	) {
		super();
	}
}
