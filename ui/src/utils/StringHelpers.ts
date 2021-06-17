export default class StringHelpers {
	public string = "";

	constructor(string: string) {
		this.string = string;
	}

	/**
	 * @example capitalize(mystring) // expected output: Mystring
	 */
	public static capitalize(string: string) {
		const capitalized = string.slice(0, 1).toUpperCase();
		return `${capitalized}${string.slice(1)}`;
	}
}
