const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// const path = require('path');

// > npx webpack
module.exports = {
	entry: {
		"por-proyecto": ['./src/js/por-proyecto.js'],
		"por-hora": ['./src/js/por-hora.js']
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					// {
					// 	loader: 'style-loader'
					// },
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: { 
							url: false
						}
					}
				]
			}
		  ]
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				filename: 'index.html',
				template: './src/index.html',
				inject: 'body',
				minify: false
			}
		),
		new HtmlWebpackPlugin(
			{
				filename: 'por-hora.html',
				template: './src/por-hora.html',
				inject: 'body',
				minify: false
			}
		),
		new MiniCssExtractPlugin({
			filename: 'bundle.min.css',
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin(),
		  	// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
		  	// `...`,
		  	new CssMinimizerPlugin(),
		],
	},
};