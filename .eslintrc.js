module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'consistent-return': 'off',
		'import/extensions': [
			'error',
			{
				ts: 'never',
				tsx: 'never',
				js: 'never',
				jsx: 'never',
			},
		],
		'import/no-unresolved': 'off',
		indent: [
			'error',
			'tab',
		],
		'jsx-a11y/label-has-associated-control': 'off',
		'linebreak-style': 'off',
		'no-await-in-loop': 'off',
		'no-plusplus': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-tabs': 'off',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'prefer-arrow-callback': 'off',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: [
					'.tsx',
				],
			},
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
	},
};
