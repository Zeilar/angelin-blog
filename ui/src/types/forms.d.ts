export interface FormField {
	value: string;
	validations?: FieldValidations;
	errors?: string[];
}

export interface FieldValidations {
	[key: string]: {
		input: string;
		rules: Rule;
	};
}

export type Rule = {
	[key in Validation]?: Value;
};

export type Value = string | number | boolean;

export type Validation = "min" | "max" | "required" | "match" | "email";
