import { Request } from "./";

interface PostData {
	title: string;
	body: string;
}

export class PostHelpers {
	public static async create<T>(post: PostData) {
		return await Request.post<T>({ url: "", method: "POST", body: post });
	}
}
