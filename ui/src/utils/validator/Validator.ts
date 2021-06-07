import { FieldValidations, Value } from "../../types/forms";
import StringHelpers from "../String";

type Error = string[];

export default class Validator {
	public validations: FieldValidations;
	public errors = new Map<string, Error>();

	constructor(validations: FieldValidations) {
		this.validations = validations;
		this.validate();
	}

	protected validate() {
		//
		for (const validation in this.validations) {
			console.log(this.validations[validation].input);
			for (const rule in this.validations[validation].rules) {
				console.log(rule);

				this["min"]("", "", "");

				// this[rule]("", "", "");
			}
		}
	}

	private pushError(field: string, message: string) {
		const messages = this.errors.get(field) ?? [];
		this.errors.set(field, [...messages, message]);
	}

	private required(field: string, input: string, value?: Value) {
		if (Boolean(input)) {
			this.pushError(field, `${StringHelpers.capitalize(field)} is required.`);
		}
	}

	private min(field: string, input: string, value: Value) {
		if (input.length < value) {
			this.pushError(
				field,
				`${StringHelpers.capitalize(field)} must be greater than ${value} characters.`
			);
		}
	}

	private max(field: string, input: string, value: Value) {
		if (input.length > value) {
			this.pushError(
				field,
				`${StringHelpers.capitalize(field)} must be shorter than ${value} characters.`
			);
		}
	}
}
