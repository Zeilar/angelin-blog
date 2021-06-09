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
	};
	shadow: {
		elevate: string;
		elevateUnder: string;
		spread: string;
	};
	borderRadius: number;
	breakpoints: {
		phone: number;
		tablet: 1200;
	};
}

export const theme: Theme = {
	color: {
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
		link: "0, 100, 255",
	},
	shadow: {
		elevate: "0 0 3px 0 rgba(0, 0, 0, 0.85)",
		elevateUnder: "0 1px 3px rgba(0, 0, 0, 0.85), 0 0 5px rgba(0, 0, 0, 0.25)",
		spread: "0 0 8px 0 rgba(0, 0, 0, 0.85)",
	},
	borderRadius: 3,
	breakpoints: {
		phone: 768,
		tablet: 1200,
	},
};
