export class NumberHelpers {
	public number: number;

	constructor(number: number) {
		this.number = number;
	}

	/**
	 * @description Change negative numbers to 0
	 * @example clamp(-5) // expected output: 0
	 */
	public static clamp(number: number) {
		return number < 0 ? 0 : number;
	}

	public static paginate(page: number, perPage: number) {}
}
