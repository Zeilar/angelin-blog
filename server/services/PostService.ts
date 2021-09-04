import { Logger } from "../utils";
import { PostRepository } from "../repositories/PostRepository";
import { injectable } from "inversify";

@injectable()
export class PostService {
	constructor(public readonly postRepository: PostRepository, public readonly logger: Logger) {}

	public async deleteById(id: number | string) {
		try {
			const post = await this.postRepository.findById(id);
			if (!post) {
				throw new Error(`Failed deleting post with id ${id}, not found.`);
			}
			await this.postRepository.unrelateTags(post);
			await this.postRepository.deleteById(post);
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}
}
