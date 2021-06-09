import { useState } from "react";
import { ChangeEvent } from "react";
import { FormField } from "../../types/forms";
import Validator from "../../utils/validator/Validator";

interface FieldArg {
	[key: string]: FormField;
}

export default function useForm(fields: FieldArg) {
	const [inputs, setInputs] = useState(() => {
		// Set empty string on all the fields, don't want undefined
		for (const property in fields) {
			fields[property].value = "";
		}
		return fields;
	});

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

	function validate() {
		// validation
		return true;
	}

	return { inputs, onChange, validate };
}
