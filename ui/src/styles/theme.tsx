interface ITheme {
	changeHsl(hsl: string, cb: (h: number, s: number, l: number) => string): string;
	changeHslLighting(hsl: string, cb: (l?: number) => number): string;
	darkenHsl(hsl: string): string;
	lightenHsl(hsl: string): string;
	color: {
		body: string;
		primary: string;
		secondary: string;
		brand: string;
		text: string;
		textSecondary: string;
		textMuted: string;
		border: string;
		borderSecondary: string;
		link: string;
		error: string;
		success: string;
	};
	shadow: {
		elevate: string;
		elevateUnder: string;
		spread: string;
	};
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

export function changeHsl(hsl: string, cb: (h: number, s: number, l: number) => string) {
	const [h, s, l] = hsl.split(", ").map((value: string) => parseInt(value));
	return cb(h, s, l);
}

export function changeHslLighting(hsl: string, cb: (l: number) => number) {
	return changeHsl(hsl, (h, s, l) => `${h}, ${s}%, ${cb(l)}%`);
}

export function darkenHsl(hsl: string) {
	return changeHslLighting(hsl, lighting => lighting - 5);
}

export function lightenHsl(hsl: string) {
	return changeHslLighting(hsl, lighting => lighting + 5);
}

export const theme: ITheme = {
	changeHsl,
	changeHslLighting,
	darkenHsl,
	lightenHsl,
	color: {
		/**
		 * Should be kept in same format to avoid confusion
		 * Currently HSL
		 */
		body: "35, 35, 35",
		primary: "55, 55, 55",
		secondary: "45, 45, 45",
		brand: "150, 65%, 65%",
		text: "225, 225, 225",
		textSecondary: "15, 15, 15",
		textMuted: "175, 175, 175",
		border: "150, 150, 150",
		borderSecondary: "75, 75, 75",
		link: "0, 150, 255",
		error: "225, 0, 0",
		success: "0, 175, 0",
	},
	shadow: {
		elevate: "0 0 10px 0 rgba(0, 0, 0, 0.65)",
		elevateUnder: "0 4px 8px rgba(0, 0, 0, 0.15)",
		spread: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
	},
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

interface Colors {
	body: string;
	primary: string;
	secondary: string;
	brand: string;
	text: string;
	textSecondary: string;
	textMuted: string;
	border: string;
	borderSecondary: string;
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
		body: "35, 35, 35",
		primary: "55, 55, 55",
		secondary: "45, 45, 45",
		brand: "150, 65%, 65%",
		text: "225, 225, 225",
		textSecondary: "35, 35, 35",
		textMuted: "175, 175, 175",
		border: "150, 150, 150",
		borderSecondary: "75, 75, 75",
		link: "0, 150, 255",
		error: "225, 0, 0",
		success: "0, 175, 0",
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

	public static darken() {
		this.selected = this.lighting(lighting => lighting - 8);
		return this;
	}

	public static lighten() {
		this.selected = this.lighting(lighting => lighting + 8);
		return this;
	}
}
