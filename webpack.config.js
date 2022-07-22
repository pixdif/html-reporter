/**
 * @param {Record<string, string>} env environment variables
 * @param {Record<string, string>} argv command-line arguments
 * @return {import('webpack').Configuration} webpack configuration
 */
module.exports = function config(env, argv) {
	const mode = argv?.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			main: './src/index.tsx',
		},
	};
};
