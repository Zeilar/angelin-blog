import { UserRepository } from "../../repositories";
import errorlog from "../../utils/errorlog";

export class Middleware {
	public readonly userRepository = new UserRepository();
	public readonly errorlog = errorlog;
}
