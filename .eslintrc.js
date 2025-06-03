module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
	plugins: ['react'],
	rules: {
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-curly-brace-presence': [
			'error', // or "warn"
			{
				props: 'always',
				children: 'always', // Optional: apply to children too, or set to "ignore" / "never"
				propElementValues: 'always', // Optional: apply to JSX elements passed as props
			},
		],
	},
	overrides: [{files: '**/*.{ts,tsx}'}],
}
