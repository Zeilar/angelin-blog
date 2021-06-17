export class NumberHelpers {
	public string: string;

	constructor(string: string) {
		this.string = string;
	}

	/**
	 * @description Change negative numbers to 0
	 * @example clamp(-5) // expected output: 0
	 */
	public static clamp(number: number) {
		if (typeof number !== "number")
			throw new Error(`Invalid number argument, got ${JSON.stringify(number)}`);
		return number < 0 ? 0 : number;
	}
}
