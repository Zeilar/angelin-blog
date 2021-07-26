interface Colors {
	body: string;
	primary: string;
	secondary: string;
	brand: string;
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

	public selected: string;

	public readonly dark: Colors = {
		body: "220, 38%, 6%",
		primary: "222, 21%, 9%",
		secondary: "216, 45%, 22%",
		brand: "355, 70%, 50%",
		text: "0, 0%, 80%",
		textStrong: "0, 0%, 90%",
		textSecondary: "0, 0%, 17.5%",
		textSecondaryStrong: "0, 0%, 0%",
		textMuted: "0, 0%, 68.5%",
		border: "0, 0%, 25%",
		link: "210, 100%, 65%",
		error: "0, 100%, 50%",
		success: "120, 100%, 35%",
	};

	public readonly light: Colors = {
		body: "200, 10%, 90%",
		primary: "0, 0%, 100%",
		secondary: "0, 0%, 95%",
		brand: "150, 65%, 35%",
		text: "0, 0%, 4%",
		textStrong: "0, 0%, 0%",
		textSecondary: "0, 0%, 88%",
		textSecondaryStrong: "0, 0%, 100%",
		textMuted: "0, 0%, 60%",
		border: "0, 0%, 93%",
		link: "210, 100%, 50%",
		error: "0, 100%, 60%",
		success: "120, 100%, 35%",
	};

	public colors = this[this.scheme];

	public get(color?: keyof Colors) {
		return color ? this.colors[color] : this.selected;
	}

	public pick(key: keyof Colors) {
		this.selected = this.colors[key];
		return this;
	}

	public modify(cb: (h: number, s: number, l: number) => string) {
		const [h, s, l] = this.selected.split(", ").map((value: string) => parseInt(value));
		return cb(h, s, l);
	}

	public lighting(cb: (l: number) => number) {
		return this.modify((h, s, l) => `${h}, ${s}%, ${cb(l)}%`);
	}

	public darken(value?: number) {
		this.selected = this.lighting(lighting => lighting - (value ?? 5));
		return this;
	}

	public lighten(value?: number) {
		this.selected = this.lighting(lighting => lighting + (value ?? 5));
		return this;
	}
}

interface Shadows {
	elevate: string;
	elevateUnder: string;
	spread: string;
}

class Shadow {
	constructor(public scheme: "light" | "dark" = "dark") {}

	public selected: string;

	public readonly dark: Shadows = {
		elevate: "0 0 4px 0 rgba(0, 0, 0, 0.75)",
		elevateUnder: "0 3px 6px rgba(0, 0, 0, 0.08)",
		spread: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
	};

	public readonly light: Shadows = {
		elevate: "0 0 6px 0 rgba(0, 0, 0, 0.08)",
		elevateUnder: "0 3px 6px rgba(0, 0, 0, 0.08)",
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
