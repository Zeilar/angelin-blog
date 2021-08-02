import { Post } from "../models";
import { SERVER_URL } from "./constants";

export class URLHelpers {
	public static server() {
		return SERVER_URL;
	}

	public static api() {
		return `${this.server()}/api`;
	}

	public static apiPost(id?: number | string) {
		return id ? `${this.api()}/posts/${id}` : "";
	}

	public static apiPosts() {
		return `${this.api()}/posts`;
	}

	public static apiComments() {
		return `${this.api()}/comments`;
	}

	public static apiTags() {
		return `${this.api()}/tags`;
	}

	public static apiUsers() {
		return `${this.api()}/users`;
	}

	public static getPost(post?: Post | null) {
		return post ? `/post/${post.id}-${post.title}` : "";
	}
}
