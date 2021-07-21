interface Colors {
	body: string;
	primary: string;
	secondary: string;
	brand: string;
	text: string;
	textSecondary: string;
	textMuted: string;
	border: string;
	link: string;
	error: string;
	success: string;
}

class Color {
	public selected: string;

	public dark: Colors = {
		body: "0, 0%, 17%",
		primary: "0, 0%, 24%",
		secondary: "0, 0%, 19%",
		brand: "150, 65%, 65%",
		text: "0, 0%, 88%",
		textSecondary: "0, 0%, 17.5%",
		textMuted: "0, 0%, 68.5%",
		border: "0, 0%, 10%",
		link: "0, 100%, 50%",
		error: "0, 100%, 60%",
		success: "120, 100%, 35%",
	};

	public light: Colors = {
		body: "0, 50%, 50%",
		primary: "25, 25%, 25%",
		secondary: "0, 0%, 19%",
		brand: "150, 65%, 65%",
		text: "0, 0%, 88%",
		textSecondary: "0, 0%, 17.5%",
		textMuted: "0, 0%, 68.5%",
		border: "0, 0%, 10%",
		link: "0, 100%, 50%",
		error: "0, 100%, 60%",
		success: "120, 100%, 35%",
	};

	public colors = this.dark;

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
		this.selected = this.lighting(lighting => lighting - (value ?? 8));
		return this;
	}

	public lighten(value?: number) {
		this.selected = this.lighting(lighting => lighting + (value ?? 8));
		return this;
	}
}

interface Shadows {
	elevate: string;
	elevateUnder: string;
	spread: string;
}

class Shadow {
	public selected: string;

	public shadows: Shadows = {
		elevate: "0 0 3px 0 rgba(0, 0, 0, 0.75)",
		elevateUnder: "0 4px 8px rgba(0, 0, 0, 0.15)",
		spread: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
	};

	public pick(...keys: Array<keyof Shadows>) {
		return keys.map(key => this.shadows[key]).join(", ");
	}
}

export class Theme {
	public color = new Color();
	public shadow = new Shadow();
	public durations = {
		// In milliseconds
		modalsAfterResponse: 500,
		modalsFade: 250,
	};
	public borderRadius = 5;
	public breakpoints = {
		// In pixels
		phone: 768,
		tablet: 1200,
	};
}

export const theme = new Theme();
