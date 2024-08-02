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
			},
		},
	},
	plugins: [],
}

