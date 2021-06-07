export interface User {
	id: number;
	email: string;
	is_admin: boolean;
	created_at: string;
	updated_at: string;
	posts?: Post[];
	comments?: Comment[];
}

export interface Post {
	id: number;
	user_id: number;
	title: string;
	body: string;
	created_at: string;
	updated_at: string;
	author: User;
	comments?: Comment[];
	tags?: Tag[];
}

export interface Comment {
	id: number;
	user_id: number;
	body: string;
	created_at: string;
	updated_at: string;
	author: User;
	post: Post;
}

export interface Tag {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	posts?: Post[];
}
