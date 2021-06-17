export class NumberHelpers {
	public string: string;

	constructor(string: string) {
		this.string = string;
	}

	public static clamp(number: number) {
		if (typeof number !== "number")
			throw new Error(`Invalid number argument, got ${JSON.stringify(number)}`);
		return number < 0 ? 0 : number;
	}
}
