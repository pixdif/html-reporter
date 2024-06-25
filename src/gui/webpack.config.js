import path from 'path';
import url from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootDir = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * @param {Record<string, string>} env environment variables
 * @param {Record<string, string>} argv command-line arguments
 * @return {import('webpack').Configuration} webpack configuration
 */
export default function config(env, argv) {
	const mode = argv?.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		target: 'web',
		resolve: {
			extensions: [
				'.js',
				'.ts',
			],
		},
		entry: {
			app: path.resolve(rootDir, 'index.ts'),
		},
		output: {
			filename: 'static/[name].js',
			path: path.resolve(rootDir, '../../dist'),
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /node_modules/,
						name: 'vendor',
						enforce: true,
						chunks: 'all',
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.[tj]s$/,
					exclude: /node_modules/,
					use: 'ts-loader',
					resolve: {
						fullySpecified: false,
					},
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								sourceMap: mode === 'development',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: mode === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'static/[name].css',
			}),
			new HtmlWebpackPlugin({
				title: 'Test Report Viewer',
				output: 'index.html',
				template: 'src/gui/index.html',
			}),
		],
		devtool: mode === 'production' ? undefined : 'source-map',
		devServer: {
			static: 'output',
		},
	};
}
