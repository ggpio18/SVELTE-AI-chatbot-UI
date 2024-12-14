/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				bounce: 'bounce 1s infinite'
			}
		}
	},
	plugins: []
};