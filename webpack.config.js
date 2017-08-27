var path = require('path')
var webpack = require('webpack')
var config = {
	entry: [
		'webpack/hot/dev-server',
		path.join(__dirname, 'client', 'src', 'main')
	],
	output: {
		path: path.join(__dirname, 'client', 'dist'),
		filename: 'bundle.js',
		publicPath: '/client/dist/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/, 
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" }
				]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.html$/,
				loader: "raw-loader"
			}
		]
	},
	resolve: {
		extensions: [' ', '.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config