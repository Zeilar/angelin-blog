import { Controller } from "./Controller";
import * as inversify from "inversify-express-utils";
import { TagRepository } from "../../repositories";

@inversify.controller("/api/tags")
export class TagController extends Controller {
	constructor(public readonly tagRepository: TagRepository) {
		super();
	}

	@inversify.httpGet("/")
	public async index() {
		return this.json({ data: await this.tagRepository.all() });
	}
}
