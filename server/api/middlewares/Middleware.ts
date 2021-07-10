import { UserRepository } from "../../repositories";
import errorlog from "../../utils/errorlog";
import { ErrorMessages } from "../utils";

export class Middleware {
	public readonly userRepository = new UserRepository();
	public readonly errorlog = errorlog;
	public readonly ErrorMessages = ErrorMessages;
}
