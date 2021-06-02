export interface Model {
	readonly id: number;
	readonly created_at: string;
	updated_at: string;
}

export interface UserSchema extends Model {
	email: string;
	password?: string;
	is_admin: number | boolean;
}

export interface PostSchema extends Model {
	user_id: number;
	title: string;
	body: string;
}

export interface CommentSchema extends Model {
	post_id: number;
	user_id: number;
	body: string;
}

export interface TagSchema extends Model {
	name: string;
}
