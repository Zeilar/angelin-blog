interface Theme {
	color: {
		body: string;
		primary: string;
		secondary: string;
		third: string;
		brand: string;
		brandDark: string;
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

export const theme: Theme = {
	color: {
		// Must be kept in rgb format
		body: "27, 39, 53",
		primary: "32, 43, 57",
		secondary: "24, 34, 47",
		third: "30, 40, 50",
		brand: "0, 150, 255",
		brandDark: "0, 125, 255",
		text: "225, 225, 225",
		textSecondary: "15, 15, 15",
		textMuted: "75, 85, 90",
		border: "50, 50, 50",
		borderSecondary: "75, 75, 75",
		link: "0, 150, 255",
		error: "175, 0, 0",
		success: "0, 175, 0",
	},
	shadow: {
		elevate: "0 0 3px 0 black",
		elevateUnder: "0 1px 2px black, 0 0 0.25rem rgba(0, 0, 0, 0.35)",
		spread: "0 0 0.25rem 0 black",
	},
	durations: {
		// In milliseconds
		modalsAfterResponse: 500,
		modalsFade: 250,
	},
	borderRadius: 3,
	breakpoints: {
		// In pixels
		phone: 768,
		tablet: 1200,
	},
};
