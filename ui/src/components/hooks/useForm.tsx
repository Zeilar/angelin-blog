import { useState } from "react";
import { ChangeEvent } from "react";
import { z } from "zod";

interface Fields {
	[key: string]: any;
}

function flattenErrors(errors: z.ZodError<Fields>) {
	const flattened: { [key: string]: any } = {};
	const formatted = errors.format();
	for (const property in formatted) {
		if (property !== "_errors") {
			flattened[property] = formatted[property]?._errors ?? undefined;
		}
	}
	return flattened;
}

export default function useForm(fields: Fields, rules: (zod: typeof z) => z.ZodRawShape) {
	const [inputs, setInputs] = useState(() => {
		const fieldsObject: Fields = {};
		fields.forEach((field: any) => {
			fieldsObject[field] = "";
		});
		return fieldsObject;
	});
	const [errors, setErrors] = useState<Fields>({});

	function onChange(e: ChangeEvent<HTMLInputElement>, field: string) {
		setInputs((inputs: any) => ({ ...inputs, [field]: e.target.value }));
	}

	function validate() {
		const validation = rules(z);
		const result = z.object(validation).safeParse(inputs);
		setErrors(!result.success ? flattenErrors(result.error) : {});
	}

	return { inputs, onChange, validate, errors };
}
