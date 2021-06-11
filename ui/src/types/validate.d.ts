import "validate";

declare module "validate" {
	interface ValidationError {
		message: string;
	}
}
