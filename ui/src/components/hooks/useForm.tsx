import { useState } from "react";
import { ChangeEvent } from "react";
import { ValidationError } from "validate";
import { getMessage, userSchema } from "../../utils/validator";

interface FieldArg {
	[key: string]: any;
}

export default function useForm(fields: FieldArg) {
	const [inputs, setInputs] = useState(() => {
		const fieldsObject: FieldArg = {};
		fields.forEach((field: any) => {
			fieldsObject[field] = "";
		});
		return fieldsObject;
	});
	const [errors, setErrors] = useState<ValidationError[]>([]);

	function updateInput(field: string, data: any) {
		setInputs((inputs: any) => ({ ...inputs, [field]: data }));
	}

	function onChange(e: ChangeEvent<HTMLInputElement>, field: string) {
		updateInput(field, e.target.value);
	}

	function validate() {
		const errors = userSchema.validate(inputs);
		setErrors(errors);
	}

	return { inputs, onChange, validate, errors };
}
