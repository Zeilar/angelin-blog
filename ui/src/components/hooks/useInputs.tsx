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

	const update = useCallback((key: keyof T, value: string) => {
		setInputs(inputs => ({ ...inputs, [key]: value }));
	}, []);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			update(e.target.name as keyof T, e.target.value);
		},
		[update]
	);

	return { inputs, onChange, empty, update };
}
