import { useState, FormEvent } from "react";
import { ChangeEvent } from "react";
import { FormField } from "../../types/forms";
import Validator from "../../utils/validator/Validator";

interface FieldArg {
	[key: string]: FormField;
}

export default function useForm(fields: FieldArg) {
	// Set empty string on all the fields, don't want undefined
	for (const property in fields) {
		fields[property].value = "";
	}

	const [inputs, setInputs] = useState(fields);

	new Validator({
		email: {
			input: inputs.email.value ?? "",
			rules: {
				required: true,
				min: 3,
				max: 10,
			},
		},
	});

	function updateInput(field: string, data: any) {
		setInputs(inputs => ({ ...inputs, [field]: { ...inputs[field], ...data } }));
	}

	function onChange(e: ChangeEvent<HTMLInputElement>, field: string) {
		updateInput(field, { value: e.target.value });
	}

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// validation
	}

	return { inputs, onSubmit, onChange };
}
