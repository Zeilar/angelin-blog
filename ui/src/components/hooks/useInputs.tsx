import { useState, ChangeEvent } from "react";

export function useInputs<T>(defaultInputs: Record<keyof T, string>) {
	const [inputs, setInputs] = useState<Record<keyof T, string>>(defaultInputs);

	function update(input: keyof T, value: string) {
		setInputs(inputs => ({ ...inputs, [input]: value }));
	}

	function onChange(e: ChangeEvent<HTMLInputElement>, input: keyof T) {
		update(input, e.target.value);
	}

	function empty() {
		const emptyInputs = { ...inputs };
		for (const property in emptyInputs) {
			emptyInputs[property] = "";
		}
		setInputs(emptyInputs);
	}

	return { inputs, onChange, empty, update };
}
