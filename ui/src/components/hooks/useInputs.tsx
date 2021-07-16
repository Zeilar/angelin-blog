import { useState, ChangeEvent } from "react";

export function useInputs(inputsArg: { [key: string]: string }) {
	const [inputs, setInputs] = useState(inputsArg);

	function onChange(e: ChangeEvent<HTMLInputElement>, input: string) {
		setInputs(inputs => ({ ...inputs, [input]: e.target.value }));
	}

	function empty() {
		const emptyInputs = { ...inputs };
		for (const property in emptyInputs) {
			emptyInputs[property] = "";
		}
		setInputs(emptyInputs);
	}

	return { inputs, onChange, empty };
}
