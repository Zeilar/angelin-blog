export interface Register {
	email: string;
	password: string;
	passwordConfirm: string;
}

export interface UserEditable {
	email?: string;
	password?: string;
	avatar?: string;
	is_admin?: boolean;
}

export interface CreateUser extends UserEditable {
	github_id?: string;
	oauth?: boolean;
}
