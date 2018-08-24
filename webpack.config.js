const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require('./build-utils/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
	return webpackMerge(
		{
			mode,
			module: {
				rules: [
					{
						test: /\.jpe?g$/,
						exclude: /(node_modules|build)/,
						use: [
							{
								loader: 'url-loader',
								options: {
									limit: 5000,
								},
							},
						],
					},
				],
			},
			output: {
				path: path.resolve(__dirname, 'build'),
				filename: 'index.js',
			},
			plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
		},
		modeConfig(mode),
		presetConfig({ mode, presets })
	);
};
