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

export class Color {
	public static selected: string;

	/**
	 * Must be kept in HSL format to work properly with the methods
	 */
	public static colors: Colors = {
		body: "0, 0%, 17%",
		primary: "0, 0%, 24%",
		secondary: "0, 0%, 19%",
		brand: "150, 65%, 65%",
		text: "0, 0%, 88%",
		textSecondary: "0, 0%, 17.5%",
		textMuted: "0, 0%, 68.5%",
		border: "0, 0%, 10%",
		link: "0, 100%, 50%",
		error: "0, 100%, 45%",
		success: "120, 100%, 35%",
	};

	public static get() {
		return this.selected;
	}

	public static pick(key: keyof Colors) {
		this.selected = this.colors[key];
		return this;
	}

	public static modify(cb: (h: number, s: number, l: number) => string) {
		const [h, s, l] = this.selected.split(", ").map((value: string) => parseInt(value));
		return cb(h, s, l);
	}

	public static lighting(cb: (l: number) => number) {
		return this.modify((h, s, l) => `${h}, ${s}%, ${cb(l)}%`);
	}

	public static darken(value?: number) {
		this.selected = this.lighting(lighting => lighting - (value ?? 8));
		return this;
	}

	public static lighten(value?: number) {
		this.selected = this.lighting(lighting => lighting + (value ?? 8));
		return this;
	}
}

interface ITheme {
	durations: {
		modalsAfterResponse: number;
		modalsFade: number;
	};
	borderRadius: number;
	breakpoints: {
		phone: number;
		tablet: number;
	};
}

export const theme: ITheme = {
	durations: {
		// In milliseconds
		modalsAfterResponse: 500,
		modalsFade: 250,
	},
	borderRadius: 4,
	breakpoints: {
		// In pixels
		phone: 768,
		tablet: 1200,
	},
};

interface Shadows {
	elevate: string;
	elevateUnder: string;
	spread: string;
}

export class Shadow {
	public static selected: string;

	public static shadows: Shadows = {
		elevate: "0 0 5px 0 rgba(0, 0, 0, 0.75)",
		elevateUnder: "0 4px 8px rgba(0, 0, 0, 0.15)",
		spread: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
	};

	public static pick(...keys: Array<keyof Shadows>) {
		return keys.map(key => this.shadows[key]).join(", ");
	}
}
