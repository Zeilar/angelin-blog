interface Theme {
	color: {
		body: string;
		brand: string;
		bodyLight: string;
		bodyDark: string;
		primary: string;
		secondary: string;
		textPrimary: string;
		textMuted: string;
		textSecondary: string;
		link: string;
	};
	borderRadius: number;
}

export const theme: Theme = {
	color: {
		body: "30, 30, 30",
		brand: "123, 234, 123",
		bodyLight: "125, 90, 60",
		bodyDark: "35, 15, 5",
		primary: "100, 100, 100",
		secondary: "10 , 10, 10",
		textPrimary: "225, 225, 225",
		textMuted: "150, 150, 150",
		textSecondary: "15, 15, 15",
		link: "0, 127, 255",
	},
	borderRadius: 3,
};