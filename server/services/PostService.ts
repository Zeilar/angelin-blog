import { HTTPError } from "./../utils/HTTPError";
import { PostRepository } from "../repositories/PostRepository";
import { injectable } from "inversify";

@injectable()
export class PostService {
	constructor(public readonly postRepository: PostRepository) {}

	public async deleteById(id: number | string) {
		const post = await this.postRepository.findById(id);
		if (!post) {
			throw new HTTPError(`Failed deleting post with id ${id}, not found.`, 404);
		}
		await this.postRepository.deleteAndUnrelateById(post.id);
	}
}
