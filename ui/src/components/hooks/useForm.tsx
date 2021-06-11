import { useState } from "react";
import { ChangeEvent } from "react";
import Schema, { ValidationError } from "validate";

interface FieldArg {
	[key: string]: any;
}

export default function useForm(fields: FieldArg, validateSchema: Schema) {
	const [inputs, setInputs] = useState(() => {
		const fieldsObject: FieldArg = {};
		fields.forEach((field: any) => {
			fieldsObject[field] = "";
		});
		return fieldsObject;
	});
	const [errors, setErrors] = useState<ValidationError[]>([]);

	function onChange(e: ChangeEvent<HTMLInputElement>, field: string) {
		setInputs((inputs: any) => ({ ...inputs, [field]: e.target.value }));
	}

	function validate() {
		const errors = validateSchema.validate(inputs);
		console.log(errors[0]?.constructor.name);
		setErrors(errors);
	}

	return { inputs, onChange, validate, errors };
}
