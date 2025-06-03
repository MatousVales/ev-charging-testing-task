module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				electricPulse: {
					'0%, 100%': {color: '#0891b2', ['text-shadow']: '0 0 5px rgba(8, 145, 178, 0.3)'},
					'50%': {color: '#06b6d4', ['text-shadow']: '0 0 15px rgba(6, 182, 212, 0.5)'},
				},
			},
			animation: {
				electricPulse: 'electricPulse 2.5s infinite ease-in-out',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
