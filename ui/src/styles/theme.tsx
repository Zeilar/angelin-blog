interface Colors {
	body: string;
	primary: string[];
	brand: string;
	brandDark: string;
	text: string;
	textStrong: string;
	textSecondary: string;
	textSecondaryStrong: string;
	textMuted: string;
	border: string;
	link: string;
	error: string;
	success: string;
}

class Color {
	constructor(public scheme: "light" | "dark" = "dark") {}

	public readonly dark: Colors = {
		body: "14, 14, 16",
		primary: ["25, 25, 25", "35, 35, 35", "50, 50, 50"],
		brand: "220, 40, 50",
		brandDark: "200, 30, 40",
		text: "225, 225, 225",
		textStrong: "255, 255, 255",
		textSecondary: "50, 50, 50",
		textSecondaryStrong: "0, 0, 0",
		textMuted: "175, 175, 175",
		border: "40, 40, 40",
		link: "0, 127, 255",
		error: "200, 0, 0",
		success: "0, 200, 0",
	};

	public readonly light: Colors = {
		body: "14, 14, 16",
		primary: ["25, 25, 25", "35, 35, 35", "50, 50, 50"],
		brand: "220, 40, 50",
		brandDark: "200, 30, 40",
		text: "225, 225, 225",
		textStrong: "255, 255, 255",
		textSecondary: "50, 50, 50",
		textSecondaryStrong: "0, 0, 0",
		textMuted: "175, 175, 175",
		border: "75, 75, 75",
		link: "210, 100%, 65%",
		error: "0, 100%, 50%",
		success: "120, 100%, 35%",
	};

	public colors = this[this.scheme];

	public rgb(color: keyof Colors, level: number = 1) {
		if (typeof this.colors[color] === "string") {
			return `rgb(${this.colors[color]})`;
		}
		return `rgb(${this.colors[color][level - 1]})`;
	}

	/**
	 * @description Opacity should be a float number between 0-1.
	 */
	public rgba(color: keyof Colors, opacity: number, level: number = 1) {
		if (typeof this.colors[color] === "string") {
			return `rgba(${this.colors[color]}, ${opacity})`;
		}
		return `rgba(${this.colors[color][level - 1]}, ${opacity})`;
	}
}

interface Shadows {
	elevate: string;
	spread: string;
}

class Shadow {
	constructor(public scheme: "light" | "dark" = "dark") {}

	public selected: string;

	public readonly dark: Shadows = {
		elevate: "0 1px 2px 0 rgba(0, 0, 0, 0.9), 0 0 2px 0 rgba(0, 0, 0, 0.9)",
		spread: "0 0 3px 0 rgba(0, 0, 0, 0.75)",
	};

	public readonly light: Shadows = {
		elevate: "0 0 6px 0 rgba(0, 0, 0, 0.08)",
		spread: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
	};

	public shadows = this[this.scheme];

	public pick(...keys: Array<keyof Shadows>) {
		return keys.map(key => this.shadows[key]).join(", ");
	}
}

export class Theme {
	constructor(public scheme: "light" | "dark" = "dark") {}

	public color = new Color(this.scheme);
	public shadow = new Shadow(this.scheme);
	public durations = {
		// In milliseconds
		modalsAfterResponse: 500,
		modalsFade: 250,
	};
	public borderRadius = 4;
	public breakpoints = {
		// In pixels
		phone: 768,
		tablet: 1200,
	};

	public toggleScheme() {
		const scheme = this.scheme === "light" ? "dark" : "light";
		this.color.colors = this.color[scheme];
		this.shadow.shadows = this.shadow[scheme];
	}
}

export const theme = new Theme();
