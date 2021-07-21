import { useRef } from "react";
import { useState, ChangeEvent, useCallback } from "react";

export function useInputs<T>(defaultInputs: Record<keyof T, string>) {
	const [inputs, setInputs] = useState<Record<keyof T, string>>(defaultInputs);

	const empty = useRef(() => {
		const emptyInputs = { ...inputs };
		for (const property in emptyInputs) {
			emptyInputs[property] = "";
		}
		setInputs(emptyInputs);
	}).current;

	const update = useCallback((input: keyof T, value: string) => {
		setInputs(inputs => ({ ...inputs, [input]: value }));
	}, []);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, input: keyof T) => {
			update(input, e.target.value);
		},
		[update]
	);

	return { inputs, onChange, empty, update };
}
