import { ErrorMessages } from "../utils";
import { Request, Response, NextFunction } from "express";

export class Controller {
	public ErrorMessages = ErrorMessages;

	constructor() {
		this.autoBindMethods();
	}

	private autoBindMethods() {
		const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

		methods
			.filter(method => method !== "constructor")
			// @ts-expect-error not sure how to type this yet
			.forEach(method => (this[method] = this[method].bind(this)));
	}

	public isError(value: unknown) {
		return value instanceof Error;
	}

	public errorWrapper(handler: Function) {
		return async function (req: Request, res: Response, next: NextFunction) {
			try {
				await handler(req, res, next);
			} catch (error) {
				next(error);
			}
		};
	}
}
