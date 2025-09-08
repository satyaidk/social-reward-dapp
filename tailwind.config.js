/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#6b4eff",
					dark: "#4c32d6",
					light: "#8b76ff",
				},
			},
		},
	},
	plugins: [],
};
