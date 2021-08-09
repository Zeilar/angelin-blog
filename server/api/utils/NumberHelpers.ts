export class NumberHelpers {
	/**
	 * @description Clamp a value or return it
	 * @example clamp(-5) // expected output: 0
	 * @example clamp(10) // expected output: 10
	 */
	public static clamp(number: number) {
		return Math.max(0, number);
	}

	/**
	 * @description Try to parse unknown to int
	 * @example NumberHelpers.int("5a") // expected output: 5
	 */
	public static int(value: unknown) {
		if (typeof value === "number") {
			return value;
		} else if (typeof value === "string") {
			return parseInt(value);
		}
		return Number(value);
	}

	/**
	 * @description Safely parse page/perPage without having to convert strings to ints
	 * @example paginate("1", "20"); // expected output: { page: 1, perPage: 20 }
	 */
	public static paginate(page: string, perPage: string): { page: number; perPage: number };
	public static paginate(page: number, perPage: number): { page: number; perPage: number };
	public static paginate(page: unknown, perPage: unknown) {
		return {
			page: NumberHelpers.clamp(NumberHelpers.int(page ?? 0) - 1),
			perPage: NumberHelpers.clamp(NumberHelpers.int(perPage ?? 20)),
		};
	}
}
