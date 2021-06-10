import Schema, { ValidationError } from "validate";

export function getMessage(errors: ValidationError[], key: string) {
	return errors.find((error: ValidationError) => error.path === key);
}

export const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		length: { min: 3, max: 30 },
	},
	password: {
		type: String,
		required: true,
		length: { min: 3, max: 30 },
	},
});
