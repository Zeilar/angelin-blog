import { useState, ChangeEvent, useCallback, useRef } from "react";

export function useInputs<T>(defaultInputs: Record<keyof T, string>) {
	const [inputs, setInputs] = useState<Record<keyof T, string>>(defaultInputs);

	const empty = useRef(() => {
		const emptyInputs = { ...defaultInputs };
		for (const property in emptyInputs) {
			emptyInputs[property] = "";
		}
		setInputs(emptyInputs);
	}).current;

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
	}, []);

	return { inputs, onChange, empty };
}
