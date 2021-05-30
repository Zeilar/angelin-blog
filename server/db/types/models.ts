export interface Model {
	readonly id: number;
	readonly created_at: string;
	updated_at: string;
}

export interface User extends Model {
	email: string;
	password?: string;
	is_admin: number;
}

export interface Post extends Model {
	user_id: number;
	title: string;
	body: string;
}

export interface Comment extends Model {
	post_id: number;
	user_id: number;
	body: string;
}

export interface Tag extends Model {
	name: string;
}
