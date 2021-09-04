import { PostRepository } from "../repositories/PostRepository";
import { injectable } from "inversify";

@injectable()
export class PostService {
	constructor(public readonly postRepository: PostRepository) {}

	public async deleteById(id: number | string) {
		const post = await this.postRepository.findById(id);
		await this.postRepository.deleteAndUnrelateById(post.id);
	}
}
