interface Theme {
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

export const theme: Theme = {
	color: {
		// Must be kept in rgb format
		body: "27, 39, 53",
		primary: "37, 48, 62",
		secondary: "19, 29, 42",
		brand: "180, 30, 65",
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
		elevate: "0 0 2px 1px rgba(0, 0, 0, 0.5)",
		elevateUnder: "0 2px 1px rgba(0, 0, 0, 0.35), 0 0 0.25rem rgba(0, 0, 0, 0.5)",
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
