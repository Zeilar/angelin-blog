import { useState, ChangeEvent } from "react";

export function useInputs(inputsArg: { [key: string]: string }) {
	if (!inputsArg) throw new Error(`Expected inputs object, got ${JSON.stringify(inputsArg)}`);

	const [inputs, setInputs] = useState(inputsArg);

	function onChange(e: ChangeEvent<HTMLInputElement>, input: string) {
		setInputs(inputs => ({ ...inputs, [input]: e.target.value }));
	}

	return { inputs, onChange };
}
