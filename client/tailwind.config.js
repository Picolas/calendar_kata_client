/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html, ts}"
	],
	theme: {
		extend: {
			fontSize: {
				'xxs': '0.7rem',
				'xxxs': '0.625rem',
				'xxxxs': '0.475rem',
			},
		},
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
		},
	},
	plugins: [],
}

