/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			// Using modern `rgb`
			primary: 'rgb(var(--color-primary) / <alpha-value>)',
			'primary-bg': 'rgb(var(--color-primary-bg) / <alpha-value>)',
			secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
			'secondary-bg': 'rgb(var(--color-secondary-bg) / <alpha-value>)',
			page: 'rgb(var(--color-page) / <alpha-value>)',
			border: 'rgb(var(--color-border) / <alpha-value>)',
		},
		extend: {}
	},
	plugins: []
};
