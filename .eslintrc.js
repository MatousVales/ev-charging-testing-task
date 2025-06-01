module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: ['plugin:react-hooks/recommended', 'plugin:prettier/recommended'],
	rules: {
		'react-hooks/exhaustive-deps': 'error',
	},
	overrides: [{files: '**/*.{ts,tsx}'}],
}
